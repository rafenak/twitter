import { SVGProps } from "../../utils/GlobalInterfaces";

export default function BlockSVG(props: SVGProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" height={props.height} width={props.width}>
      <g>
         <path fill={props.color ? props.color : '#000' } d="M12 3.75c-4.55 0-8.25 3.69-8.25 8.25 0 1.92.66 3.68 1.75 5.08L17.09 5.5C15.68 4.4 13.92 3.75 12 3.75zm6.5 3.17L6.92 18.5c1.4 1.1 3.16 1.75 5.08 1.75 4.56 0 8.25-3.69 8.25-8.25 0-1.92-.65-3.68-1.75-5.08zM1.75 12C1.75 6.34 6.34 1.75 12 1.75S22.25 6.34 22.25 12 17.66 22.25 12 22.25 1.75 17.66 1.75 12z"></path>
      </g>
    </svg>
  );
}
 