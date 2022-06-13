import React, { ReactNode } from 'react';

import './Page.scss';

type TPage = {
    name: string;
    description: string;
    icon: ReactNode;
    children: ReactNode
}
const Page = ({
  name, description, icon, children,
}: TPage) => (
  <div className="page">
    <div className="page__heading">
      {icon}
      <div>
        <h1 className="page__heading_head">{name}</h1>
        <p className="page__heading_description">{description}</p>
      </div>
    </div>
    <div className="page__content">
      {children}
    </div>
  </div>
);

export default Page;
