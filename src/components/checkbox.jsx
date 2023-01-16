import styled from "styled-components";

const StyledInputCheckbox = styled.input.attrs({ type: "checkbox" })`
  padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;

  &:checked ~ label:after {
    content: "";
    display: block;
    position: absolute;
    top: 6px;
    left: 9px;
    width: 6px;
    height: 14px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &:checked ~ label:before {
    content: "";
    background: rgb(238, 122, 136);
    background: linear-gradient(
      180deg,
      rgba(238, 122, 136, 1) 0%,
      rgba(161, 129, 180, 1) 76%
    );
  }
`;

const StyledLabel = styled.label`
  /* styles */
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    -webkit-appearance: none;
    background-color: transparent;
    border: 2px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 10px;
    display: inline-block;
    border-radius: 50%;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
  }
`;

export const Checkbox = (props) => {
  return (
    <>
      <StyledInputCheckbox
        readOnly
        type="checkbox"
        checked={props.checked}
      />
      <StyledLabel {...props} className="relative"></StyledLabel>
    </>
  );
};
