/**
 * 冒泡排序
 *
 **/

var exchange = function (arr, index0, index1) {
    var tmp = arr[index0];
    arr[index0] = arr[index1];
    arr[index1] = tmp;

};

var bubbleSort = function (arr, callback) {
    var length = arr.length;
    var i, j, end;

    for (i = 0; i < length; i++) {
        end = length - i;
        for (j = 0; j < end; j++) {
            //从小到大排序
            if (arr[j] > arr[j + 1]) {
                exchange(arr, j, j + 1);
            }
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    // return arr;
};

var selectSort = function (arr, callback) {
    var length = arr.length;
    var i, j, end;

    for (i = 0; i < length; i++) {
        end = length - i;
        for (j = 0; j < end; j++) {
            //从小到大排序
            if (arr[end - 1] < arr[j]) {
                exchange(arr, end - 1, j);
            }
            if (typeof callback === 'function') {
                callback();
            }
        }
    }
}

var insertSort = function (arr, callback) {
    var length = arr.length;
    var i, j;
    var newArr = [arr[0]];
    for (i = 1; i < length; i++) {
        if (arr[i] > newArr[length - 1]) {
            //newArr[]
        } else {

        }
    }
}

function partition(myArray, left, right,callback) {
    var pivot = myArray[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    console.log('pivot:',pivot);

    while (i <= j) {
        while (myArray[i] < pivot) {
            i++;
        }
        while (myArray[j] > pivot) {
            j--;
        }
        if (i <= j) {
            exchange(myArray, i, j);
            if (typeof callback === 'function') {
                callback();
            }
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(myArray, left, right,callback) {
    if (myArray.length < 2){
        return myArray;
    }
    left = (typeof left !== "number" ? 0 : left);
    right = (typeof right !== "number" ? myArray.length - 1 : right);
    var index = partition(myArray, left, right,callback);
    if (left < index - 1) {
        quickSort(myArray, left, index - 1,callback);
    }
    if (index < right) {
        quickSort(myArray, index, right,callback);
    }
    return myArray;
}

function quickSort1(arr){
    if(arr.length<=1){
        return arr;//如果数组只有一个数，就直接返回；
    }

    var num = Math.floor(arr.length/2);//找到中间数的索引值，如果是浮点数，则向下取整
    var numValue = arr.splice(num,1);//找到中间数的值
    var left = [];
    var right = [];

    for(var i=0;i<arr.length;i++){
        if(arr[i]<numValue){
            left.push(arr[i]);//基准点的左边的数传到左边数组
        }
        else{
            right.push(arr[i]);//基准点的右边的数传到右边数组
        }
    }
    return quickSort1(left).concat(numValue,quickSort1(right));//递归不断重复比较
}



function quickSort2(arr){
    if(arr.length < 2){
        return arr;
    }
    var mid = arr.length/2;
    var midArr = arr.splice(mid,1);
    var i;
    var left =[];
    var right = [];
    for(i=0;i<arr.length;i++){
        if(arr[i] < midArr){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort2(left).concat(midArr,quickSort2(right));
}

var sort = function(arr){
 if(arr.length <= 1){
       return arr;
    }    
  var left = [],right = [];
   var index = arr.length/2;
  var center = arr.splice(index,1);
   var i;
   for(i=0;i<arr.length;i++){
       if(arr[i] < center){
           left.push(arr[i]);
       }else{
           right.push(arr[i]);
       }
   }
   return sort(left).concat(center,sort(right));
}


























