import react,{Component} from "react";
class  Alert extends react.Component {
	componentDidMount(){
		  const timeout = setTimeout(() => {
		     this.props.renderStatusShow()
		    }, 1000);
		    return () => clearTimeout(timeout);

 
	}
	render(){
		const {info}=this.props;
		const valuecolor={color:info.color};
	  return (
	 	<>
	 		<div className="showAlertinfo"><p style={valuecolor}>! information:   {info.mes}</p></div>
	 	</>
	  );
	}
}

export default Alert;
