var zmm = {
    _modules: {},
    _configs: {
        // 用于拼接相对路径
        basePath: (function (path) {
            if (path.charAt(path.length - 1) === '/') {
                path = path.substr(0, path.length - 1);
            }
            return path.substr(path.indexOf(location.host) + location.host.length + 1);
        })(location.href),
        // 用于拼接相对根路径
        host: location.protocol + '//' + location.host + '/'
    }
};

zmm.hasModule = function (_uri) {
    // 判断是否已有该模块，不论加载中或已加载好
    return this._modules.hasOwnProperty(_uri);
};
zmm.isModuleLoaded = function (_uri) {
    // 判断该模块是否已加载好
    return !!this._modules[_uri];
};
zmm.pushModule = function (_uri) {
    // 新模块占坑，但此时还未加载完成，表示加载中；防止重复加载
    if (!this._modules.hasOwnProperty(_uri)) {
        this._modules[_uri] = null;
    }
};
zmm.installModule = function (_uri, mod) {
    this._modules[_uri] = mod;
};

zmm.resolvePath = function (path) {
    // 返回绝对路径
    var res = '', paths = [], resPaths;
    if (path.match(/.*:\/\/.*/)) {
        // 绝对路径
        res = path.match(/.*:\/\/.*?\//)[0]; // 协议+域名
        path = path.substr(res.length);
    } else if (path.charAt(0) === '/') {
        // 相对根路径 /开头
        res = this._configs.host;
        path = path.substr(1);
    } else {
        // 相对路径 ./或../开头或直接文件名
        res = this._configs.host;
        resPaths = this._configs.basePath.split('/');
    }
    resPaths = resPaths || [];
    paths = path.split('/');
    for (var i = 0; i < paths.length; i++) {
        if (paths[i] === '..') {
            resPaths.pop();
        } else if (paths[i] === '.') {
            // do nothing
        } else {
            resPaths.push(paths[i]);
        }
    }
    res += resPaths.join('/');
    // TODO: 直接打开html，这里对直接写文件名的路径处理有问题, './xxx.js' 也不行
    return res;
};

zmm.load = function (uris) {
    var i, nsc;
    for (i = 0; i < uris.length; i++) {
        if (!this.hasModule(uris[i])) {
            this.pushModule(uris[i]);
            // 开始加载
            nsc = document.createElement('script');
            nsc.src = uris[i];
            document.body.appendChild(nsc);
        }
    }
};

var define = zmm.define = function (dependPaths, fac) {
    var _uri = document.currentScript.src;
    if (zmm.isModuleLoaded(_uri)) {
        return;
    }
    var factory, depPaths, uris = [];
    if (arguments.length === 1) {
        factory = arguments[0];

        // 挂载到模块组中
        // zmm.installModule(_uri, factory()); // 这里有隐患 如果模块就是没有返回值呢，难道就表示这个模块没有加载吗,
        zmm.installModule(_uri, factory() || 'loaded'); // 返回值是空时，加一个loaded状态

        // 告诉proxy该模块已装载好
        zmm.proxy.emit(_uri);
    } else {
        // 有依赖的情况
        factory = arguments[1];

        // 装载完成的回调函数
        zmm.use(arguments[0], function () {
            zmm.installModule(_uri, factory.apply(null, arguments) || 'loaded');
            zmm.proxy.emit(_uri);
        });
    }
};

//

zmm.use = function (paths, callback) {
    if (!Array.isArray(paths)) {
        paths = [paths];
    }
    var uris = [], i;
    for (i = 0; i < paths.length; i++) {
        uris.push(this.resolvePath(paths[i]));
    }
    // 先注册事件，再加载
    this.proxy.watch(uris, callback);
    this.load(uris);
};





















zmm.proxy = function () {
    var proxy = {};
    var taskId = 0;
    var taskList = {};

    var execute = function (task) {
        var uris = task.uris,
            callback = task.callback;
        for (var i = 0, arr = []; i < uris.length; i++) {
            arr.push(zmm._modules[uris[i]]);
        }
        callback.apply(null, arr);
    };
    var deal_loaded = function (_uri) {
        var i, k, task, sum;
        // 当一个模块加载完成时，遍历当前任务栈
        for (k in taskList) {
            if (!taskList.hasOwnProperty(k)) {
                continue;
            }
            task = taskList[k];
            if (task.uris.indexOf(_uri) > -1) {
                // 查看这个任务中的模块是否都已加载好
                for (i = 0, sum = 0; i < task.uris.length; i++) {
                    if (zmm.isModuleLoaded(task.uris[i])) {
                        sum ++;
                    }
                }
                if (sum === task.uris.length) {
                    // 都加载完成 删除任务
                    delete(taskList[k]);
                    execute(task);
                }
            }
        }
    };

    proxy.watch = function (uris, callback) {
        var task;

        // 先检查一遍是否都加载好了
        for (var i = 0, sum = 0; i < uris.length; i++) {
            if (zmm.isModuleLoaded(uris[i])) {
                sum ++;
            }
        }
        if (sum === uris.length) {
            execute({
                uris: uris,
                callback: callback
            });
        } else {
            // 订阅新加载任务
            task = {
                uris: uris,
                callback: callback
            };
            taskList['' + taskId] = task;
            taskId ++;
        }
    };

    proxy.emit = function (_uri) {
        console.log(_uri + ' is loaded!');
        deal_loaded(_uri);
    };
    return proxy;
}();






































