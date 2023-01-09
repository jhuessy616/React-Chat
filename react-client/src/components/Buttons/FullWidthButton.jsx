// ! Creating a reuseable full width button that we can call on anywhere

function FullWidthButton(props) {
  return (
      <div className="d-grid gap-2 mb-4">
          {props.children}
          </div>
  )
}

export default FullWidthButton