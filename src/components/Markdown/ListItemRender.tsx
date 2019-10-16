import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash/fp';

interface IListItemRenderProps {
  index: number;
  checked: boolean | undefined;
  children: ArrayLike<React.ReactNode>;
}

interface ILabelProps {
  htmlFor: string;
  deleted: boolean;
}

const Checkbox = styled.input`
  margin-right: 7px;
`;

const Label = styled.label<ILabelProps>`
  text-decoration: ${(props) => (props.deleted ? 'line-through' : 'none')};
`;

const ListItemRender: React.SFC<IListItemRenderProps> = (props) => {
  const { checked, children, index } = props;
  const uniqid = `checkbox-${Date.now()}-${index}`;

  return (
    <li>
      {checked !== null && <Checkbox id={uniqid} type="checkbox" checked={checked} disabled />}
      <Label htmlFor={uniqid} deleted={!!checked}>{children}</Label>
    </li>
  );
};

export default ListItemRender;
