import * as React from 'react';

import UserModel from '../../models/user';
import DispatchEvents from '../../types/DispatchEvents';

export interface Props {
  users: UserModel[];
  dispatch: (type: DispatchEvents, params: UserModel) => void;
}

interface UserRawProps {
  user: UserModel;
  dispatch: (type: DispatchEvents, params: UserModel) => void;
}

class UserRow extends React.Component<UserRawProps, {}> {
  constructor(props: UserRawProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(_e: React.MouseEvent<HTMLLIElement>): void {
    if (this.props.user != null) {
      this.props.dispatch('SetUserForm', new UserModel(this.props.user.toJSON()));
    }
  }

  render(): JSX.Element {
    const { user: { name, email } } = this.props;

    return (
      <li className="list-group-item" style={{ cursor: 'pointer' }} onClick={this.handleClick}>
        {name} <small>{email}</small>
      </li>
    );
  }
}

export default function({ users, dispatch }: Props): JSX.Element {
  return (
    <div className="col-md-12">
      <h3>ユーザ一覧</h3>
      <ul className="list-group">
        {users.map((radio, i) => (<UserRow key={i} user={radio} dispatch={dispatch} />))}
      </ul>
    </div>
  );
}
