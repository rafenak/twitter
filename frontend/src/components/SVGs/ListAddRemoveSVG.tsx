import { SVGProps } from "../../utils/GlobalInterfaces";

export default function ListAddRemoveSVG(props: SVGProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" height={props.height} width={props.width}>
      <g>
        <path fill={props.color ? props.color : '#000' } d="M5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5H12v2H5.5C4.12 22 3 20.88 3 19.5v-15C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5V13h-2V4.5c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2zm10 7v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"></path>
      </g>
    </svg>
  );
}
 