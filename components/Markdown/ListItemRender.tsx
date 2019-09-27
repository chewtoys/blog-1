import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash/fp';

interface IListItemRenderProps {
  checked: boolean | undefined;
}

interface ITextProps {
  deleted: boolean;
}

const Checkbox = styled.input`
  margin-right: 7px;
`;

const Text = styled.span<ITextProps>`
  text-decoration: ${(props) => (props.deleted ? 'line-through' : 'none')};
`;

const ListItemRender: React.SFC<IListItemRenderProps> = (props) => {
  const { checked, children } = props;

  return (
    <li>
      {checked !== null && <Checkbox type="checkbox" checked={checked} disabled />}
      <Text deleted={!!checked}>{children}</Text>
    </li>
  );
};

export default ListItemRender;
