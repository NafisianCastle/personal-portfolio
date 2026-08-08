"use client";

import dynamic from "next/dynamic";
import type { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";

// Dynamically import heavy sub-components to keep initial bundle lean
const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code),
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection,
  ),
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
);

const NotionPageRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false },
);

interface NotionRendererProps {
  recordMap: ExtendedRecordMap;
}

export default function NotionRenderer({ recordMap }: NotionRendererProps) {
  return (
    <div className="notion-wrapper">
      <NotionPageRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={true}
        components={{ Code, Collection, Equation }}
        disableHeader
      />
    </div>
  );
}
