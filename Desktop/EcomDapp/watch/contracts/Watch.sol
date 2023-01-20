// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Watch {
    
    using Counters for Counters.Counter;
    Counters.Counter private _watchesIds;
    Counters.Counter private _commentsIds;
    Counters.Counter private _ordersIds;

    address owner;

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    struct watch {
        uint id;
        string name;
        string description;
        uint price;
        string image;
        uint quantity;
    }

    struct order {
        uint id;
        address buyer;
        uint quantity;
        uint amount;
        uint date;
        uint idWatch;
    }

    struct comment {
        uint id;
        address author;
        string comment;
        uint idWatch;
    }

    mapping(uint => watch) Watches;
    mapping(uint => comment) Comments;

    mapping(uint => order) Orders; 

    constructor() {
        owner = msg.sender;
    }

    function getWatch(uint _id) external view returns(watch memory) {
        return Watches[_id];
    }

    function getWatches() external view returns(watch[] memory){ //tous les objets (vendu et non vendu)
        watch[] memory watchTab = new watch[](_watchesIds.current());
        uint j = 1;
        for(uint i = 0; i < _watchesIds.current(); i++) { 
            watchTab[i] = Watches[j];
            j++;
        }
        return watchTab;
    }

    function getOrders()external view isOwner returns(order[] memory){
        order[] memory orderTab = new order[](_ordersIds.current());
        uint j = 1;
        for(uint i = 0; i < _ordersIds.current(); i++) { 
            orderTab[i] = Orders[j];
            j++;
        }
        return orderTab;
    }
    
    function getMyOrders(address _user) external view returns(order[] memory){
        uint size = 0;
        for(uint i = 1; i <= _ordersIds.current(); i++) {
        if(Orders[i].buyer == _user){
                size++;
          }
        }

        order[] memory orderTab = new order[](size);
        uint j = 0;
        for(uint i = 1; i <= _ordersIds.current(); i++) {
        if(Orders[i].buyer == _user){
                orderTab[j] = Orders[i];
                j++;
          }
        }
        return orderTab;
    }

    function getComments(uint _idWatch) external view returns(comment[] memory) {
        uint size = 0;
        for(uint i = 1; i <= _commentsIds.current(); i++) {
        if(Comments[i].idWatch == _idWatch){
                size++;
          }
        }
        comment[] memory commentTab = new comment[](size);
        uint j = 0;
        for(uint i = 1; i <= _commentsIds.current(); i++) {
        if(Comments[i].idWatch == _idWatch){
                commentTab[j] = Comments[i];
                j++;
          }
        }
        return commentTab;
    }

    function getBalance() external view isOwner returns(uint) {
        return address(this).balance;
    }

    function addWatch(string memory _name, string memory _description, uint _price, string memory _image, uint _quantity) external isOwner{
        _watchesIds.increment(); //on ajoute un
        uint256 newItemId = _watchesIds.current(); 
        Watches[newItemId].id = newItemId;
        Watches[newItemId].name = _name;
        Watches[newItemId].description = _description;
        Watches[newItemId].price = _price;
        Watches[newItemId].image = _image;
        Watches[newItemId].quantity = _quantity;
    }

    function setWatch(uint _id, string memory _name, string memory _description, uint _price, string memory _image, uint _quantity) external isOwner{
        Watches[_id].name = _name;
        Watches[_id].description = _description;
        Watches[_id].price = _price;
        Watches[_id].image = _image;
        Watches[_id].quantity = _quantity;
    }

    function addComment(uint _idWatch, string memory _comment) external {
        _commentsIds.increment(); //on ajoute un
        uint256 newItemId = _commentsIds.current();
        Comments[newItemId].id = newItemId;
        Comments[newItemId].author = msg.sender;
        Comments[newItemId].comment = _comment;
        Comments[newItemId].idWatch = _idWatch;
    } //dire a la fin on pourrait aller plus loin et aussi ajouter une fct qui permet de modifier 

    function buy(uint _idWatch, uint _quantity, address payable _to) external payable {
        //tester si la commande se créé quand meme si la tx a echoué
        _ordersIds.increment();
        uint256 newItemId = _ordersIds.current(); 
        Orders[newItemId].id = newItemId;
        Orders[newItemId].buyer = msg.sender;
        Orders[newItemId].quantity = _quantity;
        Orders[newItemId].amount = _quantity * Watches[_idWatch].price;//voir si le calcul fctn
        Orders[newItemId].date = block.timestamp;
        Orders[newItemId].idWatch = _idWatch;
        Watches[_idWatch].quantity -= _quantity;
        _to.transfer(msg.value);
    }

    function withdraw() public payable isOwner{
      require(payable(msg.sender).send(address(this).balance)); //envoi ce qui est dans le contrat vers owner
    }

    receive() external payable {}


}
