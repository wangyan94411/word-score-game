var BAG_OF_LETTERS = [
		new Letter('_', 2, 0),
		new Letter('_', 2, 0),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('B', 2, 3),
		new Letter('B', 2, 3),
		new Letter('C', 2, 3),
		new Letter('C', 2, 3),
		new Letter('D', 4, 2),
		new Letter('D', 4, 2),
		new Letter('D', 4, 2),
		new Letter('D', 4, 2),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('F', 2, 4),
		new Letter('F', 2, 4),
		new Letter('G', 3, 2),
		new Letter('G', 3, 2),
		new Letter('G', 3, 2),
		new Letter('H', 2, 4),
		new Letter('H', 2, 4),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('J', 1, 8),
		new Letter('K', 1, 5),
		new Letter('L', 4, 1),
		new Letter('L', 4, 1),
		new Letter('L', 4, 1),
		new Letter('L', 4, 1),
		new Letter('M', 2, 3),
		new Letter('M', 2, 3),
		new Letter('N', 6, 1),
		new Letter('N', 6, 1),
		new Letter('N', 6, 1),
		new Letter('N', 6, 1),
		new Letter('N', 6, 1),
		new Letter('N', 6, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('P', 2, 3),
		new Letter('P', 2, 3),
		new Letter('Q', 1, 10),
		new Letter('R', 6, 1),
		new Letter('R', 6, 1),
		new Letter('R', 6, 1),
		new Letter('R', 6, 1),
		new Letter('R', 6, 1),
		new Letter('R', 6, 1),
		new Letter('S', 4, 1),
		new Letter('S', 4, 1),
		new Letter('S', 4, 1),
		new Letter('S', 4, 1),
		new Letter('T', 6, 1),
		new Letter('T', 6, 1),
		new Letter('T', 6, 1),
		new Letter('T', 6, 1),
		new Letter('T', 6, 1),
		new Letter('T', 6, 1),
		new Letter('U', 4, 1),
		new Letter('U', 4, 1),
		new Letter('U', 4, 1),
		new Letter('U', 4, 1),
		new Letter('V', 2, 4),
		new Letter('V', 2, 4),
		new Letter('W', 2, 4),
		new Letter('W', 2, 4),
		new Letter('X', 1, 8),
		new Letter('Y', 2, 4),
		new Letter('Y', 2, 4),
		new Letter('Z', 1, 10),
];

var YOUR_HAND = new Array();
var SCORE = 0;
function startGame() {
	addNumbersFromBag();
	displayHand();
	
};



function addNumbersFromBag(){
	console.log("your hand has:" + YOUR_HAND.length);
	for(i=YOUR_HAND.length; i < 7; i++){
		YOUR_HAND[i] = getAvailableLetter();
	}
	
}


function displayHand(){
	console.log("your hand has:" + YOUR_HAND.length);
	for (i = 0; i < YOUR_HAND.length; i++) {

		console.log("#letter-" + (i+1) +" set to " + YOUR_HAND[i].letter);
		$( "#letter-" + (i+1)).addClass("letter-" + YOUR_HAND[i].letter);
		$( "#points-" + (i+1)).addClass("points-" + YOUR_HAND[i].pointsWhenLettersUsed);
		
		
		
		
		$( "#letter-" + (i+1)).html(YOUR_HAND[i].letter);
		
		$( "#points-" + (i+1)).html(YOUR_HAND[i].pointsWhenLettersUsed);
	}
	
}



function getAvailableLetter(){
	var randomIndex = Math.floor(Math.random() * BAG_OF_LETTERS.length);
	var randomLetter = BAG_OF_LETTERS.splice(randomIndex, 1);
	console.log(randomLetter[0]);
	return randomLetter[0];
}


/**
 * 组合排列 + 各个组合的全排列
 **/
var theWordToUse;

function findWordToUse() {

    var maxPoint = 0;
    var letters = new Array();

    var pointMap = new Map();
    for (var i = 0; i < YOUR_HAND.length; i++) {
        letters[i] = YOUR_HAND[i].letter;
        pointMap.set(YOUR_HAND[i].letter, YOUR_HAND[i].pointsWhenLettersUsed);
    }

    // 获取所有组合
    var letterGroup = getGroup(letters);

    var theWordToUseDispplay;

    var j = 0;
    for (j; j < letterGroup.length; j++) {
        var point = 0;
        var letterJudge = letterGroup[j];
        //console.log(letterJudge);
        var k = 0;
        for (k; k < letterJudge.length; k++) {
            point = point + pointMap.get(letterJudge.charAt(k));
        }

        // 验证此组合的全全排列是否可以组成一个单词
        var array = letterJudge.split("");
        var flag = findWordToUseCore(array, 0);
        if (flag && point > maxPoint) {
            maxPoint = point;
            theWordToUseDispplay = theWordToUse;
        }
    }
    if (theWordToUseDispplay == null || theWordToUseDispplay.length == 0) {
        alert("此序列无法组成一个单词，请retire your hand!");
    } else {
        $("#human-word-input").val(theWordToUseDispplay);
    }
}


/**
 *  获得所有组合
 */
function getGroup(data, index = 0, group = []) {
    var needApply = new Array();
    needApply.push(data[index]);
    for (var i = 0; i < group.length; i++) {
        needApply.push(group[i] + data[index]);
    }
    group.push.apply(group, needApply);

    if (index + 1 >= data.length) {
        return group;
    } else {
        return getGroup(data, index + 1, group);
    }
}

/**
 * 单词全排列递归函数
 **/
function findWordToUseCore(charArray, k) {
    var i = k;
    var hasFound = false;
    for (i; i < charArray.length; i++) {
        var temp1 = charArray[k];
        charArray[k] = charArray[i];
        charArray[i] = temp1;

        // 如果找到一个，立马返回
        hasFound = findWordToUseCore(charArray, k + 1);
        if (hasFound) {
            return true;
        }

        // 回溯
        var temp2 = charArray[k];
        charArray[k] = charArray[i];
        charArray[i] = temp2;

    }

    if (k == charArray.length) {
        var strArrays = wildcardSolution(charArray);
        for (var j = 0; j < strArrays.length; j++) {
            if (isThisAWord(strArrays[j])) {
                theWordToUse = charArray.join("");
                //console.log(strArrays[j]);
                return true;
            }
        }
        return false;
    }
}

/**
 * 进阶任务：解决 "_" 作为通配符
 * 两个前提：1. 上边我们已经得到了字符串的所有组合，所以只需暴力替换 ”_“ 为 ”A-Z“即可
 *         2. 由字母包可知一个待判断的串最多有两个 通配符 “_”
 */
function wildcardSolution(wordAarry) {
    var wordAarryTemp = new Array();
    index1 = -1;
    index2 = -1;
    for (i = 0; i < wordAarry.length; i++) {
        wordAarryTemp[i] = wordAarry[i];
        if (wordAarry[i] == '_') {
            if (index1 == -1) {
                index1 = i;
            } else {
                index2 = i;
            }
        }
    }
    var arrays = new Array();
    if (index1 == -1 && index2 == -1) {
        arrays.push(wordAarryTemp.join(""));
        return arrays;
    }
    if (index1 != -1 && index2 == -1) {
        for (k = 0; k < 26; k++) {
            wordAarryTemp[index1] = String.fromCharCode(65 + k);
            arrays.push(wordAarryTemp.join(""));
        }
        return arrays;
    }

    if (index1 != -1 && index2 != -1) {
        var i = 0;
        var j = 0;
        for (i = 0; i < 26; i++) {
            wordAarryTemp[index1] = String.fromCharCode(65 + i);
            for (j = 0; j < 26; j++) {
                wordAarryTemp[index2] = String.fromCharCode(65 + j);
                arrays.push(wordAarryTemp.join(""));
            }
        }
        return arrays;
    }

}

function humanFindWordToUse(){
	
	 var humanFoundWord = $( "#human-word-input").val();
	 console.log("Checking human workd of:" + humanFoundWord);
	 
	 // 处理通配符 “_”,要不然当判断带有通配符 “_” 会出现问题
     var wordAarry = wildcardSolution(humanFoundWord.split(""));
     var flag = false;
     for (i = 0; i < wordAarry.length; i++) {
         if (isThisAWord(wordAarry[i])) {
             console.log(wordAarry[i]);
             flag = true;
         }
     }
	 
	 if(flag){
		 if(haveLettersForWord(humanFoundWord)){
			 successfullyAddedWord(humanFoundWord);
		 }else{
			 alert(humanFoundWord + " - Do not have the letters for this word");
		 }
	 }else{
		 alert(humanFoundWord + " is not a valid word.");
	 }
		
}


function successfullyAddedWord(foundWord){
	$( "#word-history-list").append("<li>" + foundWord + "</li>");
	clearClasses();
	takeOutUsedLetters();
	addNumbersFromBag();
	displayHand();
	$( "#human-word-input").val('');
	
}

function addToScore(letterToAddToScore){
	SCORE = SCORE + letterToAddToScore.pointsWhenLettersUsed;
	console.log(letterToAddToScore.pointsWhenLettersUsed + "<-Points added for " + letterToAddToScore.letter);
	$( "#score-number").html(SCORE);
}


function takeOutUsedLetters(){
	
	for(ii=0; ii < YOUR_HAND.length; ii++){
		if(YOUR_HAND[ii].used){
			addToScore(YOUR_HAND[ii]);
			YOUR_HAND.splice(ii, 1);
			ii = ii-1;
		}else{
			console.log(YOUR_HAND[ii].letter + "<- Not Used");
		}
	}
	
}

function haveLettersForWord(aProposedWord){
	//You could code the _ logic could go in this function
	var wordAsArray = aProposedWord.toUpperCase().split("");
	for (i = 0; i < wordAsArray.length; i++) {
		var foundLetter = false;
		console.log(wordAsArray[i] + "<-For match");
		for(ii=0; ii<YOUR_HAND.length; ii++){
			console.log("              " + YOUR_HAND[ii].letter + "<-Checking");
			if(YOUR_HAND[ii].letter == wordAsArray [i]){
				if(!YOUR_HAND[ii].used && !foundLetter){
					console.log("     " + YOUR_HAND[ii].letter + "<-Found");
					YOUR_HAND[ii].used = true;
					foundLetter = true;
					
				}
			}
		}
		
		
		if(!foundLetter){
			resetHand();
			return false;
		}
	}
	
	return true;
}


function resetHand(){
	
	for(ii=0; ii<YOUR_HAND.length; ii++){
		YOUR_HAND[i].used = false;
	}
}

function isThisAWord(aProposedWord){
	  if (Word_List.isInList(aProposedWord)) {
	      return true;
	  }
	  return false;
}

function retireHand(){
	//Loose all the points in your hand
	clearClasses();
	YOUR_HAND = new Array();
	addNumbersFromBag();
	displayHand();
}
function clearClasses(){
	for(ii=0; ii < YOUR_HAND.length; ii++){
		$("#letter-" + (ii+1)).removeClass("letter-" + YOUR_HAND[ii].letter);
		$("#points-" + (ii+1)).removeClass("points-" + YOUR_HAND[ii].pointsWhenLettersUsed);
	}
}

$(document).ready(function() {
	startGame();
	
	$("#find-word-button").click(function() {
		findWordToUse();
	});
	$("#human-find-word-button").click(function() {
		humanFindWordToUse();
	});
	$("#retire-hand-button").click(function() {
		retireHand();
	});
	$('#human-word-input').keypress(function(event) {
		if (event.which == 13) {
			humanFindWordToUse();
		}
	});
});