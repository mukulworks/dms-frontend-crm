import React from "react";
import { Rolling } from "react-loading-io";
import func from "../../../../../../utils/common.functions";
import * as constants from "../../../../../../utils/constant";
import FileWithExtension from "../../../../../../components/Shared/FileWithExtension/FileWithExtension";
const Conversation = ({ conver, switchControl, caseConversationModel }) => {
  const clickHandler = () => {
    switchControl(conver ? "" : constants.CONVERSATION);
  };

  // if(caseConversationModel || caseConversationModel === undefined){
  //     return null
  // }

  return (
    <li className={"nav-item Conversation" + (conver ? " active" : "")}>
      <div className="sub-content-wrapper">
        <a className="nav-link" href="#" onClick={clickHandler}>
          <span className="mdi mdi-calendar-text-outline"></span>
          <span className="text-title">Conversation</span>
        </a>
        {
          <div className={"sub-content pt" + (conver ? " " : " d-none")}>
            <div className="row bg-light mx-1 pt-3 px-2">
              <div className="col-6">
                <span>Conversation for Case ID :</span>{" "}
                <span>{caseConversationModel.caseId}</span>
              </div>
              <div className="col-6 text-right">
                <span>
                  Last Follow-Up:
                  {func.dateTimeFormatter(caseConversationModel.lastFollowUp)}
                </span>
              </div>
              <div className="col-12">
                <hr className="my-3" />
              </div>

              <div
                className="col-12"
                style={{ height: "200px", overflow: "auto" }}
              >
                {caseConversationModel.caseConversations &&
                  caseConversationModel.caseConversations.map(
                    (caseConversation, key) => {
                      const isEscalation =
                        caseConversation?.by?.includes("Escalation");
                      const splitMessage =
                        caseConversation?.message?.split("|");

                      return (
                        <div
                          key={key}
                          className={
                            "row bg-light pt-1 px-2 pb-3" +
                            (caseConversation.isOwner
                              ? ""
                              : " justify-content-end mb-1 ")
                          }
                        >
                          <div className="col-9">
                            <div
                              className={
                                "card" +
                                (caseConversation.isOwner ? "" : " mb-2")
                              }
                            >
                              <div className="card-header p-2 font-16">
                                <span className="mdi mdi-account"></span>{" "}
                                {caseConversation.by}
                                <small className="float-right">
                                  {func.dateTimeFormatter(
                                    caseConversation.performedOn
                                  )}
                                </small>
                              </div>
                              <div className="card-body p-1">
                                <p className="card-text">
                                  {isEscalation ? (
                                    <>
                                      After Sale -{" "}
                                      {splitMessage?.length > 0 &&
                                        splitMessage[0]}
                                      <br />
                                      Mail-Id:{" "}
                                      {splitMessage?.length > 1 &&
                                        splitMessage[1]}{" "}
                                      <br />
                                      As On:{" "}
                                      {splitMessage?.length > 2 &&
                                        splitMessage[2]}
                                      <br />
                                    </>
                                  ) : (
                                    caseConversation.message
                                  )}
                                </p>
                                <div className="float-right">
                                  {caseConversation.docs &&
                                    caseConversation.docs.map((doc, key) => (
                                      <FileWithExtension
                                        key={key}
                                        fileExtension={doc.extension}
                                        originalFileName={doc.title}
                                        filePath={doc.url}
                                      />
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        }
      </div>
    </li>
  );
};

export default Conversation;
