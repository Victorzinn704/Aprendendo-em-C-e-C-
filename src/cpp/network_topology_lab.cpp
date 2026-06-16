#include <algorithm>
#include <functional>
#include <iostream>
#include <limits>
#include <map>
#include <queue>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

struct Edge {
    std::string to;
    int latency_ms;
};

class NetworkGraph {
public:
    void connect(const std::string& from, const std::string& to, int latency_ms)
    {
        if (latency_ms < 0) {
            throw std::invalid_argument("latencia negativa nao e aceita no grafo");
        }

        adjacency_[from].push_back({to, latency_ms});
        adjacency_[to].push_back({from, latency_ms});
    }

    std::vector<std::string> shortest_path(const std::string& start, const std::string& target) const
    {
        using Distance = long long;
        using QueueItem = std::pair<Distance, std::string>;

        std::map<std::string, Distance> distance;
        std::map<std::string, std::string> previous;
        std::priority_queue<QueueItem, std::vector<QueueItem>, std::greater<QueueItem>> queue;

        for (const auto& item : adjacency_) {
            distance[item.first] = std::numeric_limits<Distance>::max();
        }

        distance[start] = 0;
        queue.push({0, start});

        while (!queue.empty()) {
            const auto [current_distance, node] = queue.top();
            queue.pop();

            if (current_distance != distance[node]) {
                continue;
            }

            if (node == target) {
                break;
            }

            const auto found = adjacency_.find(node);
            if (found == adjacency_.end()) {
                continue;
            }

            for (const Edge& edge : found->second) {
                const Distance next_distance = current_distance + edge.latency_ms;
                if (!distance.count(edge.to) || next_distance < distance[edge.to]) {
                    distance[edge.to] = next_distance;
                    previous[edge.to] = node;
                    queue.push({next_distance, edge.to});
                }
            }
        }

        if (!distance.count(target) || distance[target] == std::numeric_limits<Distance>::max()) {
            return {};
        }

        std::vector<std::string> path;
        for (std::string node = target; !node.empty();) {
            path.push_back(node);
            if (node == start) {
                break;
            }
            node = previous[node];
        }

        std::reverse(path.begin(), path.end());
        return path;
    }

    long long path_latency(const std::vector<std::string>& path) const
    {
        long long total = 0;

        for (std::size_t i = 1; i < path.size(); ++i) {
            total += latency_between(path[i - 1], path[i]);
        }

        return total;
    }

    void print_topology() const
    {
        std::cout << "Topologia cadastrada:\n";
        for (const auto& item : adjacency_) {
            std::cout << "  " << item.first << " -> ";
            for (std::size_t i = 0; i < item.second.size(); ++i) {
                const Edge& edge = item.second[i];
                std::cout << edge.to << " (" << edge.latency_ms << " ms)";
                if (i + 1U < item.second.size()) {
                    std::cout << ", ";
                }
            }
            std::cout << '\n';
        }
    }

private:
    int latency_between(const std::string& from, const std::string& to) const
    {
        const auto found = adjacency_.find(from);
        if (found == adjacency_.end()) {
            return 0;
        }

        for (const Edge& edge : found->second) {
            if (edge.to == to) {
                return edge.latency_ms;
            }
        }

        return 0;
    }

    std::map<std::string, std::vector<Edge>> adjacency_;
};

static void print_path(const std::vector<std::string>& path)
{
    if (path.empty()) {
        std::cout << "Nenhuma rota encontrada.\n";
        return;
    }

    std::cout << "Menor caminho: ";
    for (std::size_t i = 0; i < path.size(); ++i) {
        std::cout << path[i];
        if (i + 1U < path.size()) {
            std::cout << " -> ";
        }
    }
    std::cout << '\n';
}

int main()
{
    NetworkGraph graph;

    graph.connect("PC-01", "Switch-Lab", 1);
    graph.connect("PC-02", "Switch-Lab", 1);
    graph.connect("Switch-Lab", "Roteador", 2);
    graph.connect("Roteador", "DNS", 8);
    graph.connect("Roteador", "Servidor", 6);
    graph.connect("DNS", "Servidor", 5);

    graph.print_topology();

    const std::vector<std::string> path = graph.shortest_path("PC-01", "Servidor");
    print_path(path);
    std::cout << "Latencia estimada: " << graph.path_latency(path) << " ms\n";
    std::cout << "Objetivo: evoluir os exercicios em C para grafos e rotas em C++.\n";

    return 0;
}
