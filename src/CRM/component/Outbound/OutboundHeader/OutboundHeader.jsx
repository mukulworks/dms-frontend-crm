import React from "react";
import useUserContext from "../../../../Hooks/useUserContext";
import func from "../../../../utils/common.functions";
import India from "../../../../images/india.svg";
import * as constants from "../../../../utils/constant";

const OutboundHeader = ({
  listType,
  header,
  chooseComponent,
  assignSelectedCasesToUser,
  caseAllotedUsers,
  setAllotedUser,
}) => {
  const userContext = useUserContext();
  const convertUppercase = (text) => {
    return text.toString().toUpperCase();
  };

  const handleChange = (e) => {
    let { value } = e.target;
    setAllotedUser(value);
  };

  return (
    <section className="border mx-1">
      <div className="col-12">
        <div className="row text-uppercase bg-light justify-content-between font-10">
          <div className="col-auto pl-0">
            <nav className="nav justify-content-start filter-selectedText">
              <span className="nav-link text-muted">{listType}</span>
            </nav>
          </div>
          <div className="col-auto pr-0">
            <ul className="nav justify-content-end loaction-car">
              {/* {
                                chooseComponent === constants.GETENGAGEDCASELIST &&
                                <li className="nav-item"> 
                                    <i className="mdi mdi-lock large" style={{color:"orange"}}>UNLOCK</i>
                                </li> 
                            }  */}
              <li className="nav-item">
                <span className="nav-link text-muted">
                  <img src="../images/Skoda-wordmark.png" width="50" alt="" />
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link text-muted">
                  <b>{header && header.brand}</b>
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link text-muted">
                  <img
                    src={
                      "data:image/png;base64,R0lGODlhHgAUANUAAP////GLLwCCUACCTwSEU/GLLvGNM/CEIgB6RffAjoPCqvGNMpSwvuvw85Ctu/3FkgB9R+zx8yReevOGJPT5+5Wxv4fFrPnCkJGuvOWygorHrvb3+qq8zWuxnPCGJqm8zPfBkPGNMQSEUgiGVoXDq5uxw4+su5WxvpizwJm0wShgfAOEUpayv/GLLYqvxAN8SI6sugCCTpSxvpeywJaxvwB6RCdgfJ+/0I6rupezwPCEIZevwZ6+0Guwm46yxvGPNiH5BAAAAAAALAAAAAAeABQAAAayQINwSCwaj4tfYclsOp/QVihArVqv2Gxhke16rduvWLs4mM9o9GSSbh90noR8TpdfHpnM41LvgwCAgYKAFDcuPjwUg4uMizMVFSk0LI2VixEODDYqDCYRlqAADTgOEhIYMA2hoDIoGCc5DKugGxw7JR8boQq8vb68FhodPRoWv8ckCMrLzMwQEM3RCDUvAtbX2Nna2wME29/g2N3h5NwEA+jp6uvs7TEiBPHy8/T19isjQQA7"
                    }
                    alt=""
                  ></img>
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link text-muted">
                  {header && header.country}
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link text-muted">
                  {userContext.userDetail.userContext.locationName}
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link text-muted text-capitalize">
                  {convertUppercase(
                    userContext.userDetail.userContext.companyCode
                  )}
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link text-muted">
                  {func.getCurrentDate()}
                </span>
              </li>
              {chooseComponent === constants.ALLOCATE_OUTBOUND_CASE && (
                <>
                  <li>
                    <div className="nav-link text-muted">
                      <label htmlFor="">Allocate To</label>
                    </div>
                  </li>
                  <li className="nav-item" style={{ margin: "4px" }}>
                    <select
                      name="allocateTo"
                      id="allocateTo"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option value="">Select User</option>
                      {caseAllotedUsers &&
                        caseAllotedUsers.map((caseAllotedUser, key) => (
                          <option key={key} value={caseAllotedUser.userCode}>
                            {caseAllotedUser.userName}
                          </option>
                        ))}
                    </select>
                  </li>
                  <li className="nav-item" style={{ marginLeft: "15px" }}>
                    <button
                      type="button"
                      name="save"
                      id="save"
                      className="btn btn-success"
                      onClick={() => assignSelectedCasesToUser()}
                    >
                      Save
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutboundHeader;
