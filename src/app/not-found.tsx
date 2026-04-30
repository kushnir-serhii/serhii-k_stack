// import dynamic from "next/dynamic";

import { NotFound } from "@/components/NotFound";

// const NotFoundDynamic = dynamic(() =>
//   import("./components/NotFound").then((module) => module.NotFound)
// );

export default function NotFoundPage() {

    return (
      <div>
        <NotFound />
      </div>
    );
}