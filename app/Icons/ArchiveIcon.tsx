import React from "react";

export default function ArchiveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 3H3V6H21V3Z" fill={props.fill} />
      <path d="M4.5 21H19.5V7.5H4.5V21ZM8.25 10.5H15.75C16.164 10.5 16.5 10.836 16.5 11.25C16.5 11.664 16.164 12 15.75 12H8.25C7.836 12 7.5 11.664 7.5 11.25C7.5 10.836 7.836 10.5 8.25 10.5Z" fill={props.fill} />
    </svg>
  )
}