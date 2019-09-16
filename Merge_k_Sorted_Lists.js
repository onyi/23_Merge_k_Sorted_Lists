class MinHeap {
    
    constructor(){
        this.array = [null];
    }
    
    getLeftChild(idx){
        return idx * 2;
    }
    
    getRightChild(idx){
        return idx * 2 + 1;
    }
    
    getParent(idx){
        return Math.floor(idx / 2);
    }
    
    siftUp(idx){
        let parent = this.getParent(idx);
        while(parent >= 1 && this.array[parent].val > this.array[idx].val){
            this.swap( idx, parent);
            idx = parent;
            parent = this.getParent(idx);
        }
    }
    
    siftDown(idx){
        let left = this.getLeftChild(idx);
        while(left < this.array.length){
            // console.log(`Index: ${idx}`);
            let idxToSwap = left;
            let right = this.getRightChild(idx);
            if( right < this.array.length && this.array[left].val > this.array[right].val ){
                idxToSwap = right;
            }
            console.log(`${this.array[idx].val} > ${this.array[idxToSwap].val}`)
            if(this.array[idx].val > this.array[idxToSwap].val ){
                this.swap(idx, idxToSwap);
            }else{
                return;
            }
            idx = idxToSwap;
            left = this.getLeftChild(idx);
        }
    }
    
    swap( from, to ) {
        [this.array[from], this.array[to]] = [ this.array[to], this.array[from]]
    }
    
    insert(list){
        this.array.push(list);
        if(this.array.length > 2)
            this.siftUp(this.array.length - 1);
    }
    
    deleteMin(){
        if(this.array.length === 1) return null;
        if(this.array.length === 2) return this.array.pop();
        this.swap(1, this.array.length - 1 );
        let removed = this.array.pop();
        this.siftDown(1);

        return removed;
    }
    
    peak(){
        return this.array[1];
    }
    
    delete(idx){
        if(idx < 1 || idx > this.array.length ) return null;
        this.swap(idx, this.array.length - 1);
        let removed = this.array.pop();
        this.siftDown(idx);
        return removed;
    }

}



class ListNode {

    constructor(val){
        this.val = val;
        this.next = null;
    }

}


const mergeKLists = (lists) => {
    
    if(!lists || lists.length === 0) return null;
    
    let minHeap = new MinHeap();
    
    for (const list of lists) { //construct the MinHeap first
        if(list){
            minHeap.insert(list);
        }
    }
    
    let sortedList = undefined;
    let head = null;
    let list;
    while(minHeap.array.length !== 1){
        list = minHeap.deleteMin();
        if(sortedList === undefined){
            sortedList = new ListNode(list.val);
            head = sortedList;
        }
        else{
            sortedList.next = new ListNode(list.val);
            sortedList = sortedList.next;
        }
        if(list.next !== null)
            minHeap.insert(list.next);

    }
    
    return head;
}

let h = new MinHeap();


let lists = [[-10,-9,-9,-3,-1,-1,0],[-5],[4],[-8],[],[-9,-6,-5,-4,-2,2,3],[-3,-3,-2,-1,0]];

let listNodes = [];

for( const list of lists){

    if(list.length === 0) continue;
    let head = new ListNode(list[0]);
    let tmp = head;
    for(let i = 1; i < list.length; i++){
        tmp.next = new ListNode(list.unshift());
        tmp = tmp.next;
    }
    listNodes.push(head);
}

for(const list of listNodes){
    console.log(`List: ${JSON.stringify(list)}`)
}


let res = mergeKLists(listNodes);
console.log(`Result: ${JSON.stringify(res)}`)


