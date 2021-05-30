
import react,{Component} from "react";
import './App.css';
import ItemList from "./components/Item";
import Alert from "./components/Alert";
class  App extends react.Component {
	constructor(props){
		super(props);
		this.state={
			data:[],
			KeyItemEdit:-1,
			nameEdit:'',
			ValueNameInput:'',
			AlertInfo:{show:false,mes:'',color:'gray'}
		};
	}
	OnchangeValueInput=(e)=>{
		this.setState({
			ValueNameInput:e.target.value
		});
	}
	randomkey=()=>{
		return (Math.floor(Math.random()*1000)+1);
	}
	submitForm=(e)=>{
		e.preventDefault();
		if(this.state.KeyItemEdit==-1){
			let keyItem=this.randomkey();
			let testSameId=0;
			do{	
				testSameId=0;
				if(this.state.data.length!=0){
					this.state.data.forEach((e,index)=>{
						if(e.id==keyItem){
							testSameId=1;
							keyItem=this.randomkey();
						}
					})
				}
			}while(testSameId);

			let valueAdd={id:keyItem,name:this.state.ValueNameInput};
			let dataNew=this.state.data;
			dataNew.push(valueAdd);
			this.setState({
				data:dataNew,
				ValueNameInput:'',
				AlertInfo:{show:true,mes:"Add Success",color:'green'}
			});
		}else{
			let valueAdd={id:this.state.KeyItemEdit,name:this.state.ValueNameInput};
			let dataEdit=this.state.data.map((event,index)=>{
				if(event.id==this.state.KeyItemEdit){
					return valueAdd;
				}
				return event;
			});
			this.setState({
				data:dataEdit,
				KeyItemEdit:-1,
				nameEdit:'',
				ValueNameInput:'',
				AlertInfo:{show:true,mes:"Update Success",color:'green'}
			});

		}

	}

	deleteDataById=(id)=>{
		let dataHadDel=[];
		this.state.data.forEach((e,index)=>{
			if(id!=e.id){
				dataHadDel.push(e);
			}
		});
		this.setState({
			data:dataHadDel,
			AlertInfo:{show:true,mes:"Delete Item Success",color:'red'}
		});
	}

	deleteAll=()=>{
		this.setState({
			data:[],
			AlertInfo:{show:true,mes:"Delete All success",color:'red'}
		});
	}
	EditDataById=(value)=>{
		this.setState({
			KeyItemEdit:value.id,
			nameEdit:value.name,
			ValueNameInput:value.name
		});
	}
	renderItem=()=>{
		return this.state.data.map(e=>{
			return <ItemList key={e.id} data={e} EditDataById={this.EditDataById} deleteDataById={this.deleteDataById} />;
		});
	}
	
	renderStatusShow=()=>{
		this.setState({AlertInfo:{show:false,mes:'',color:'gray'}})
	}
	render(){
	  return (
	    <div className="App">
	    	<div className="container">
	    		{this.state.AlertInfo.show && <Alert renderStatusShow={this.renderStatusShow} info={this.state.AlertInfo}/> }
	    		<div className="title">
		    			<p>Grocery Bud</p>
		    		</div>
	    		<div className="inputAdd"> 
		    		
	    			<form onSubmit={(e)=>this.submitForm(e)}>
		    			<input type="text" name="nameItem" placeholder="everything ... " onChange={(e)=>this.OnchangeValueInput(e)} value={this.state.ValueNameInput} />
		    			<button >Submit</button>
	    			</form>
	    		</div>
	      		{this.renderItem()}
	      		<div className="clearIItem">
	      			<button onClick={()=>this.deleteAll()}>clear All</button>
	      		</div>
	      	</div>
	    </div>
	  );
	}
}

export default App;
