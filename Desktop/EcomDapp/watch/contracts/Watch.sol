// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Watch {
    
    //librairie de contrats OpenZeppelin pour implémenter un compteur, montre, commentaires et commandes
    using Counters for Counters.Counter;
    Counters.Counter private _watchesIds;
    Counters.Counter private _commentsIds;
    Counters.Counter private _ordersIds;

    address owner;

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    // Les structures de données
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
    
    //Stocker les structures de données dans les mapping
    mapping(uint => watch) Watches;
    mapping(uint => comment) Comments;
    mapping(uint => order) Orders;
    //permettra d afficher les commandes d'un utilisateur et les commentaires d'une montre
    mapping(address => uint[]) UserOrders; // Stocker les ids des commandes par utilisateur, uint[]= les id commande
    mapping(uint => uint[]) WatchComments; // stocker les ids des commentaires par montre 

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
        uint[] storage userOrders = UserOrders[_user];
        order[] memory orderTab = new order[](userOrders.length);

        for(uint i = 0; i < userOrders.length; i++) {
            orderTab[i] = Orders[userOrders[i]];
        }

        return orderTab;
    }

    function getComments(uint _idWatch) external view returns(comment[] memory) {
        uint[] storage watchComments = WatchComments[_idWatch];
        comment[] memory commentTab = new comment[](watchComments.length);

        for(uint i = 0; i < watchComments.length; i++) {
            commentTab[i] = Comments[watchComments[i]];
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


    function addComment(uint _idWatch, string memory _comment) external {
        _commentsIds.increment(); //on ajoute un
        uint256 newItemId = _commentsIds.current();
        Comments[newItemId].id = newItemId;
        Comments[newItemId].author = msg.sender;
        Comments[newItemId].comment = _comment;
        Comments[newItemId].idWatch = _idWatch;
        WatchComments[_idWatch].push(newItemId);//Ajouter l'ID du commentaire au mapping des commentaires de montre
    }

    function buy(uint _idWatch, uint _quantity, address payable _to) external payable {
        _ordersIds.increment();
        uint256 newItemId = _ordersIds.current(); 
        Orders[newItemId].id = newItemId;
        Orders[newItemId].buyer = msg.sender;
        Orders[newItemId].quantity = _quantity;
        Orders[newItemId].amount = _quantity * Watches[_idWatch].price;
        Orders[newItemId].date = block.timestamp;
        Orders[newItemId].idWatch = _idWatch;
        Watches[_idWatch].quantity -= _quantity;
        UserOrders[msg.sender].push(newItemId);// Ajouter l'ID de la commande au mapping des commandes de l'util
        _to.transfer(msg.value);
    }

    function withdraw() public payable isOwner{
      require(payable(msg.sender).send(address(this).balance));
    }

    receive() external payable {}


}
