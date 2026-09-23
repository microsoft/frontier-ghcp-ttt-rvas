"""
Mystery Code Module
====================
This file contains working but complex code.
Your task: use Copilot Chat to understand what it does.

DON'T read through and try to understand it manually first —
use Chat's /explain command to accelerate your understanding.
"""

from collections import defaultdict, deque
from functools import wraps


def memoize(func):
    """A caching decorator that stores results of expensive function calls."""
    cache = {}

    @wraps(func)
    def wrapper(*args, **kwargs):
        key = (args, tuple(sorted(kwargs.items())))
        if key not in cache:
            cache[key] = func(*args, **kwargs)
        return cache[key]

    wrapper.cache = cache
    wrapper.clear_cache = lambda: cache.clear()
    return wrapper


def build_graph(edges):
    """Build an adjacency list representation from a list of edges."""
    graph = defaultdict(list)
    for u, v, weight in edges:
        graph[u].append((v, weight))
        graph[v].append((u, weight))
    return graph


def find_shortest_path(graph, start, end):
    """Find the shortest path between two nodes in a weighted graph."""
    import heapq

    distances = {node: float("inf") for node in graph}
    distances[start] = 0
    previous = {node: None for node in graph}
    pq = [(0, start)]

    while pq:
        current_distance, current_node = heapq.heappop(pq)

        if current_node == end:
            break

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node]:
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current_node
                heapq.heappush(pq, (distance, neighbor))

    # Reconstruct path
    path = []
    node = end
    while node is not None:
        path.append(node)
        node = previous[node]
    path.reverse()

    return path, distances[end]


@memoize
def fibonacci(n):
    """Compute the nth Fibonacci number with memoization."""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


def topological_sort(graph_edges):
    """Perform topological sort on a directed acyclic graph."""
    in_degree = defaultdict(int)
    adj = defaultdict(list)

    nodes = set()
    for u, v in graph_edges:
        adj[u].append(v)
        in_degree[v] += 1
        nodes.add(u)
        nodes.add(v)

    queue = deque([n for n in nodes if in_degree[n] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    if len(result) != len(nodes):
        raise ValueError("Graph has a cycle — topological sort not possible")

    return result


if __name__ == "__main__":
    # Demo: graph shortest path
    edges = [
        ("A", "B", 4), ("A", "C", 2), ("B", "D", 3),
        ("C", "B", 1), ("C", "D", 5), ("D", "E", 1),
    ]
    graph = build_graph(edges)
    path, cost = find_shortest_path(graph, "A", "E")
    print(f"Shortest path: {' -> '.join(path)} (cost: {cost})")

    # Demo: Fibonacci
    print(f"Fibonacci(30): {fibonacci(30)}")

    # Demo: topological sort
    task_deps = [("wash", "dry"), ("dry", "fold"), ("fold", "put_away"), ("wash", "iron")]
    order = topological_sort(task_deps)
    print(f"Task order: {' -> '.join(order)}")
