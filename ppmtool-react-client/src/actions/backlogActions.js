import axios from "axios";

export const addProjectTask = (backlog_id, projectTask, history) => async (
  dispatch
) => {
  await axios.post(`/api/backlog/${backlog_id}`, projectTask);
  history.push(`/projectBoard/${backlog_id}`);
};
