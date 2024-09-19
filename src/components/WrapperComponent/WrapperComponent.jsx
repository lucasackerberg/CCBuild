import ProjectComponent from "../ProjectComponent/ProjectComponent";
import { CreateProject } from "../createProject/CreateProject";

export default function WrapperComponent() {
  return (
    <div>
      <ProjectComponent></ProjectComponent>
      <CreateProject></CreateProject>
    </div>
  );
}
