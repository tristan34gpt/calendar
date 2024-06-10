import { SideMenu } from "./SideMenu";

export default function layout({ children }) {
  return (
    <html lang="fr">
      <body>
        <div className="flex">
          <SideMenu />
          {children}
        </div>
      </body>
    </html>
  );
}
