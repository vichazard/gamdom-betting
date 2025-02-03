import React from "react";
import { HeaderLayout } from "./Header";
import { ContentSection, LayoutContainer } from "./styled";

interface LayoutProps {
  children?: React.ReactNode;
}

function LayoutComponent({ children }: LayoutProps) {
  return (
    <LayoutContainer>
      <ContentSection>
        <HeaderLayout />
        {children}
      </ContentSection>
    </LayoutContainer>
  );
}

// HOC WithLayout (Higher Order Component)
// eslint-disable-next-line @typescript-eslint/naming-convention
export const WithLayout = (Component: React.FC) => () => {
  return (
    <LayoutComponent>
      <Component />
    </LayoutComponent>
  );
};
