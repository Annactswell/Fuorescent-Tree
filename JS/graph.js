document.addEventListener("DOMContentLoaded", function() {
    // 定义节点的点击状态，初始状态均为未点击
    var nodeClickState = {};

    // 定义 graph 数据
    var nodes = new vis.DataSet([
        {id: 1, label: '解析几何', title: '解析几何'},
        {id: 11, label: '直线', title: '直线'},
        {id: 12, label: '标准方程', title: '标准方程'},
        {id: 13, label: '参数方程', title: '参数方程'},
        {id: 111, label: '圆', title: '圆'},
        {id: 1111, label: '椭圆', title: '椭圆'},
        {id: 1112, label: '双曲线', title: '双曲线'},
        {id: 1113, label: '抛物线', title: '抛物线'},
        {id: 1114, label: '离心率', title: '离心率'}
    ]);

    var edges = new vis.DataSet([
        {from: 1, to: 11},
        {from: 1, to: 12},
        {from: 1, to: 13},
        {from: 11, to: 111},
        {from: 111, to: 1111},
        {from: 111, to: 1112},
        {from: 111, to: 1113},
        {from: 111, to: 1114}
    ]);

    // 创建网络图
    var container = document.getElementById('network');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: {
            shape: 'circle',
            borderWidth: 1,
            shadow:{
                enabled: true,
                color: 'rgba(255, 133, 255, 1)', // 光晕的颜色
                size: 50, // 光晕的大小
                x: 0,
                y: 0
            }
        },
        physics: {
            stabilization: false
        }
    };
    var network = new vis.Network(container, data, options);

    network.on("click", function (params) {
        if (params.nodes.length > 0) {
            var nodeId = params.nodes[0];
            var nodeLabel = nodes.get(nodeId).label;
            // 更新节点点击状态
            nodeClickState[nodeId] = true;
            // 设置节点样式
            setNodeStyle(nodeId);
            alert(nodeLabel);
        }
    });

    // 设置节点样式函数
    function setNodeStyle(nodeId) {
        var node = nodes.get(nodeId);
        if (nodeClickState[nodeId]) {
            // 如果节点被点击过，设置为实心
            node.color = {
                background: 'rgba(255, 255, 255, 1)', // 实心背景
                border: 'rgba(255, 255, 255, 1)' // 边颜色
            };
        } else {
            // 如果节点未被点击过，设置为透明
            node.color = {
                background: 'rgba(255, 255, 255, 0.01)', // 半透明背景
                border: 'rgba(255, 255, 255, 0.1)' // 边颜色
            };
        }
        // 更新节点样式
        nodes.update(node);
    }
});
