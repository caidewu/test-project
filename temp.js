

setTimeout( function timeout() {
    console.log('event loop 1');
},0);

setImmediate(function() {
    console.log('next1 before event loop');


    setImmediate(function() {
        console.log('next2 before event1');
        setImmediate(function() {
            console.log('next3 before event');
            setImmediate(function() {
                console.log('next4 before event');
                setImmediate(function() {
                    console.log('next5 before event');
                });
            });
        });
    });

    setTimeout(function() {
        console.log('next2 event loop');
    },0);


    setImmediate(function() {
        console.log('next2 before event2');
        setImmediate(function() {
            console.log('next3 before event1 immediate');
        });
        setTimeout(function() {
            console.log('next3 event loop timeout');
        },0);
    });
    setImmediate(function() {
        console.log('next2 before event3');
    });


});

setTimeout(function() {
    console.log('event loop 2 这个一定在next1 before event loop前面');
},0);



