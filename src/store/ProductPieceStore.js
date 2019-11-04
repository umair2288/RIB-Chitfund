import {EventEmitter} from 'events'
import dispatcher from '../dispatcher/dispatcher'
import keys from '../keys'
import authStore from '../store/AuthStore'
import { Exception } from 'handlebars';



class ProductPieceStore extends EventEmitter{

    constructor(){
        super(); 
        this.loading = false     
        this.productPieces=[]
    }


    getProductPieceByCode(code){
        //check the store for the product piece
        const product_piece = this.productPieces.filter((pp)=>{
            return pp.item_code === code;
        })
      
        if (product_piece.length === 0){
              //if not fetch the data base
            const URL = keys.server + '/warehouse/get-product-piece/?query_type=item_code'
            const OPTIONS = {
                method:"POST",
                headers : {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization' : "token " + authStore.initialState.token
                },
                body:JSON.stringify({item_code:code})
                
            }
            this.loading =true;

            fetch(URL,OPTIONS)
            .then(response =>{
                return response.json()
            })
            .then(result => {
                console.log(result)
                if (result.success){
                    this.productPieces.push(result.data) //update the store
                    this.emit("update")
                    this.loading = false
                    return result.data
                }else{
                    this.loading = false
                    throw new Exception(result.message)
                   
                }
               
            })
            .catch(ex=>{
                this.loading = false
                console.log(ex)
            })         
        }
        else{
            if( product_piece.length === 1){
                this.loading = false
                return product_piece.pop()   //if it's on store return data 
            }else{
                this.loading = false
                throw Exception("multiple products with same product code")  //if already sold return the error message

            }
        }
        
        //if not in the database return the error message message
       
    }

    handleActions(action){
        console.log("Product Piece store recieved action" , action)
        switch(action.type){

            case "UPDATE_PRODUCT_PIECE":{
             //   this.addCustomer(action.customer)
                break;
            }
            default:{
                console.log("Product Piece store recieved UNDEFINED action" , action)
            }

        }
    }




}






const productPieceStore = new ProductPieceStore()
dispatcher.register(productPieceStore.handleActions.bind(productPieceStore))
export default productPieceStore;