pragma solidity ^0.4.23;

import './ERC721Token.sol';

contract StarNotary is ERC721Token { 

    struct Star { 
        string name;
        string starStory;
        string ra;
        string dec;
        string mag;
    }
    
    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;
    mapping(string => bool) starCoordinatesUsed;

    function createStar(string _name, string _starStory, string _ra, string _dec, string _mag, uint256 _tokenId) public {
      
      // Verify uniquenessFactor `keccak256(_ra, _dec, _mag)`

      // Check uniqueness of star co-ordinates
      string memory currStarCoordinates = strConcat(_ra,_dec,_mag);
      require(starCoordinatesUsed[currStarCoordinates] == false, "Star co-ordinates not unique");
      starCoordinatesUsed[currStarCoordinates] = true;

      // Create a `Star memory newStar` variable      
      tokenIdToStarInfo[_tokenId] = Star(_name,_starStory,_ra,_dec,_mag);
      ERC721Token.mint(_tokenId);           
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function checkIfStarExist(string _ra, string _dec, string _mag) public view returns (bool) {
        string memory currStarCoordinates = strConcat(_ra,_dec,_mag);
        if(starCoordinatesUsed[currStarCoordinates] == true)
            return true;
        else 
            return false;        
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0);

        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);

        require(msg.value >= starCost);

        clearPreviousStarState(_tokenId);

        transferFromHelper(starOwner, msg.sender, _tokenId);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }

        starOwner.transfer(starCost);
    }

    function clearPreviousStarState(uint256 _tokenId) private {
        //clear approvals 
        tokenToApproved[_tokenId] = address(0);

        //clear being on sale 
        starsForSale[_tokenId] = 0;
    }

    // Reference: https://github.com/oraclize/ethereum-api/blob/master/oraclizeAPI_0.5.sol
    function strConcat(string _a, string _b, string _c) pure internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        string memory abc = new string(_ba.length + _bb.length + _bc.length);
        bytes memory babc = bytes(abc);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babc[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babc[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babc[k++] = _bc[i];
        return string(babc);
    }
}