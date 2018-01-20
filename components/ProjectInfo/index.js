// @flow
import * as React from 'react';
import { ProjectInfo as StyledProjectInfo } from './styles';

const ProjectInfo = () => (
  <StyledProjectInfo>
    <p>
      Example app of RAN! In the interest of fostering an open and welcoming
      environment, we as contributors, maintainers and writers pledge to making
      participation in our project and our community a harassment-free
      experience for everyone, regardless of age, body size, disability,
      ethnicity, gender identity and expression, level of experience,
      nationality, personal appearance, race, religion, or sexual identity and
      orientation. Please be kind and careful when you write something here. It
      is just showing how RAN! works on production. These posts are not related
      to RAN, Author of RAN, Contributors and Maintainers. Thank you for being
      kind, funny and awesome. For details, Please{' '}
      <a
        href="https://github.com/Sly777/ran/blob/master/CODE_OF_CONDUCT.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        click here.
      </a>
    </p>
  </StyledProjectInfo>
);

export default ProjectInfo;
