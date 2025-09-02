import { ReactNode } from "react";
import { Suspense } from "react";
export default function Layout({children}: {
  children:ReactNode
}) {
  return (
    <div className="flex flex-row">
            <Suspense>
                {children}
            </Suspense>
        
    </div>
  );
}

