import react,{Component} from "react";
class  ItemList extends react.Component {

	render(){
		const {data}=this.props;
	  return (
	 	<>
	 		<div className="ItemClass">
	 			<div className="name">
	 				<p>{data.name}</p>
	 			</div>
	 			<div className="edit-delete">
	 				<button className="edit" onClick={()=>this.props.EditDataById({'id':data.id,'name':data.name})}>
	 						edit
	 				</button>
	 				<button className="delete" onClick={()=>this.props.deleteDataById(data.id)}>
	 						delete
	 				</button>
	 			</div>
	 		</div>
	 	</>
	  );
	}
}

export default ItemList;
