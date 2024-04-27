
document.addEventListener("DOMContentLoaded", function() {
    var audios = {
        unlock: document.getElementById("unlockNodeAudio"),
        hover: document.getElementById("hoverNodeAudio"),
        click: document.getElementById("clickNodeAudio"),
        space: document.getElementById("clickSpaceAudio"),
        current: null
    };

    var nodes, edges, network;
    var nodeClickState = {};

    function initializeNetwork() {
        nodes = new vis.DataSet([
            {id: 1,    label: '解析几何',    title: '解析几何',    color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 11,   label: '直线',        title: '直线',        color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 12,   label: '标准方程',    title: '标准方程',    color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 13,   label: '参数方程',    title: '参数方程',    color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 111,  label: '圆',          title: '圆',          color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 1111, label: '椭圆',        title: '椭圆',        color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 1112, label: '双曲线',      title: '双曲线',      color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 1113, label: '抛物线',      title: '抛物线',      color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 1114, label: '离心率',      title: '离心率',      color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 2,    label: '图论',      title: '图论',      color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 23,   label: '深度遍历',         title: '深度遍历',         color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 24,   label: '广度遍历',         title: '广度遍历',         color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 25,    label: '拓扑排序',    title: '拓扑排序',    color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 21,   label: '最短路',         title: '最短路',         color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 211,   label: 'Floyd',         title: 'Floyd',         color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 212,    label: 'Dijkstra',      title: 'Dijkstra',      color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 213,   label: 'Bellman-Ford',    title: 'Bellman-Ford',           color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 2131,   label: 'SPFA',           title: 'SPFA',           color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 214,    label: 'Johnson',      title: '统计学',      color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 22,   label: '生成树',         title: '生成树',         color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 221,   label: 'Kruskal',    title: 'Kruskal',    color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }},
            {id: 222,    label: 'Prim',      title: 'Prim',      color: 'rgba(255, 255, 255, 0.5)', font: { color: 'rgba(255, 255, 255, 1)' }}
        ]);
        
        edges = new vis.DataSet([
            {from: 1,   to: 11  },
            {from: 1,   to: 12  },
            {from: 1,   to: 13  },
            {from: 11,  to: 111 },
            {from: 111, to: 1111},
            {from: 111, to: 1112},
            {from: 111, to: 1113},
            {from: 111, to: 1114},
    
            {from: 2,   to: 21  },
            {from: 2,   to: 22  },
            {from: 2,   to: 23  },
            {from: 2,   to: 24  },
            {from: 2,   to: 25  },
            {from: 21,  to: 211 },
            {from: 21,  to: 212 },
            {from: 21,  to: 213 },
            {from: 21,  to: 214 },
            {from: 213, to: 2131},
            {from: 22,  to: 221 },
            {from: 22,  to: 222 }
        ]);

        nodes.update([
            // 明确指定只显示节点1和节点2，其余节点隐藏
            { id: 1, hidden: false },
            { id: 2, hidden: false }
        ]);

        nodes.forEach(function(node) {
            if (node.id !== 1 && node.id !== 2) {
                nodes.update({ id: node.id, hidden: true });
            }
        });

        var container = document.getElementById('network');
        var data = { nodes, edges };
        var options = {
            nodes: {
                shape: 'dot',
                borderWidth: 0,
                shadow: {
                    enabled: true,
                    color: 'rgba(255, 255, 255, 0.5)',
                    size: 50,
                    x: 0,
                    y: 0
                }
            },
            physics: { stabilization: true }
        };

        network = new vis.Network(container, data, options);
        setupEventListeners();
    }

    function playAudio(audioKey) {
        if (audios.current) {
            audios.current.pause();
            audios.current.currentTime = 0;
        }
        audios.current = audios[audioKey];
        audios.current.play();
    }

    function setupEventListeners() {
        network.on("click", function(params) {
            if (params.nodes.length === 0) {
                // playAudio('space');
                return;
            }
            var nodeId = params.nodes[0];
            nodeClickState[nodeId] = true;
            playAudio(nodeClickState[nodeId] ? 'space' : 'click');
            updateNodeVisibility(nodeId);
            setNodeStyle(nodeId);

            if (nodeId == 2) alert("        图论是数学的一个分支，研究图（Graph）的性质和关系的学科。图是由节点（Vertex）和连接这些节点的边（Edge）组成的一种数据结构。\n       图论的研究对象可以是任何由对象之间的关系构成的集合，例如社交网络、电路、通信网络、交通网络等等。\n       图论的基本概念包括：\n       1. 节点（Vertex）：图中的基本元素，也称为顶点或点。\n       2. 边（Edge）：连接图中节点的线段，表示节点之间的关系。边可以是有向的（从一个节点指向另一个节点）或者无向的（没有方向性）。\n       3. 路径（Path）：图中节点的序列，通过边相连接。路径可以是简单路径（节点不重复）或者环路（起点和终点相同）。\n       4. 度（Degree）：节点的度是与该节点相连的边的数量。对于有向图，节点的入度是指指向该节点的边的数量，出度是指从该节点出发的边的数量。\n       5. 连通性（Connectivity）：图中节点之间是否存在路径，以及图的整体结构是否连通。\n       6. 图的类型：根据边的性质和节点之间的连接关系，图可以分为无向图（边没有方向）、有向图（边有方向）和加权图（边有权重）等。\n       7. 图的表示：图可以通过邻接矩阵、邻接表等方式进行表示和存储。\n       图论在计算机科学、网络科学、运筹学、物理学等领域都有广泛的应用，例如在路由算法、社交网络分析、图像处理、组合优化等方面。");
           
            if (nodeId == 25) alert("       拓扑排序是对有向无环图(Directed Acyclic Graph, DAG)中所有节点的一种线性排序，使得对于任意一对有向边 (u, v)，均有 u 在排序中出现在 v 之前。\n       拓扑排序常用于描述一个工程的编译顺序、任务的优先级等。例如，在软件工程中，如果一个源文件依赖于另一个源文件，那么必须先对依赖文件进行编译，再对主文件进行编译。\n       拓扑排序算法通常采用深度优先搜索（DFS）或广度优先搜索（BFS）来实现。\n       在实现过程中，可以使用一个栈来存储已经排序好的节点，每当一个节点的所有相邻节点都已经被访问过后，将该节点压入栈中。\n       最终，栈中节点的出栈顺序即为拓扑排序的结果。如果图中存在环路，则无法进行拓扑排序。\n       拓扑排序的时间复杂度为 O(V+E)，其中 V 表示节点数，E 表示边数。");

            if (nodeId == 21) alert("       最短路径算法是用来计算图中两个节点之间最短路径的算法。在很多实际应用中，如路线规划、网络路由等，都需要找到两个节点之间的最短路径。\n       最短路径算法的应用范围很广，其中最著名的算法包括Dijkstra算法、Bellman-Ford算法和Floyd-Warshall算法。\n       Dijkstra算法用于计算单源最短路径，即从图中的一个固定起点到所有其他节点的最短路径。它采用贪心策略，每次选择当前最短路径的节点进行扩展，直到到达目标节点。\n       Bellman-Ford算法可以处理带有负权边的图，并且能够检测到负权环路。它的时间复杂度为 O(V*E)，其中 V 表示节点数，E 表示边数。\n       Floyd-Warshall算法用于计算图中所有节点之间的最短路径。它采用动态规划的思想，逐步更新最短路径的估计值，直到找到所有节点之间的最短路径。\n       最短路径算法的选择取决于图的特性和问题的要求，不同的算法有着不同的适用场景和性能表现。");

            if (nodeId == 212) alert("      Dijkstra算法是一种用于计算图中单源最短路径的贪心算法。它能够找到从图中的一个固定起点到所有其他节点的最短路径。\n       算法的基本思想是维护一个距离数组，用来记录从起点到每个节点的最短距离。初始时，起点的距离设置为0，其他节点的距离设置为无穷大。\n       然后，算法每次选择一个距离数组中距离最小的节点进行扩展，并更新其相邻节点的距离。具体来说，对于当前节点的每个相邻节点，如果通过当前节点到达该相邻节点的路径距离小于目前已知的距离，则更新该相邻节点的距离为更小的值。\n       算法继续选择距离数组中未标记的节点中距离最小的节点进行扩展，直到所有节点都被标记为止。\n       Dijkstra算法的时间复杂度取决于具体实现方式，通常情况下，使用优先队列实现的Dijkstra算法的时间复杂度为 O((V+E)logV)，其中 V 表示节点数，E 表示边数。\n       Dijkstra算法仅适用于没有负权边的图，如果图中存在负权边，则需要使用其他算法，如Bellman-Ford算法。");

            if (nodeId == 213) alert("      Bellman-Ford算法是一种用于计算图中单源最短路径的动态规划算法。与Dijkstra算法不同，Bellman-Ford算法可以处理带有负权边的图，并且能够检测到负权环路。\n       算法的基本思想是进行|V|-1轮松弛操作，其中|V|表示图中节点的数量。每轮松弛操作都会遍历图中所有的边，尝试通过每条边更新起点到目标节点的最短距离。\n       在每轮松弛操作中，算法会对每条边进行检查，如果发现通过该边可以获得更短的路径，则更新目标节点的距离。\n       在进行|V|-1轮松弛操作之后，算法会再进行一轮松弛操作来检测是否存在负权环路。如果在这一轮中仍然发现可以通过某条边缩短路径，则说明图中存在负权环路。\n       Bellman-Ford算法的时间复杂度为 O(V*E)，其中 V 表示节点数，E 表示边数。\n       由于算法的时间复杂度较高，通常只在图中包含负权边或需要检测负权环路时使用。对于没有负权边的图，Dijkstra算法通常更加高效。");



        });

        network.on("hoverNode", function(params) {
            playAudio('hover');
        });

        network.on("blurNode", function(params) {
            if (audios.current === audios.hover) {
                audios.hover.pause();
                audios.hover.currentTime = 0;
            }
        });
    }

    function updateNodeVisibility(nodeId) {
        var updateNodes = [];
        var connectedNodes = network.getConnectedNodes(nodeId);
        connectedNodes.forEach(function(id) {
            if (nodes.get(id).hidden) {
                updateNodes.push({id: id, hidden: false});
            }
        });
        nodes.update(updateNodes);
    }

    function setNodeStyle(nodeId) {
        var node = nodes.get(nodeId);
        node.color = {
            background: nodeClickState[nodeId] ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'
        };
        nodes.update(node);
    }



    initializeNetwork();

});
