def is_cyclic(graph, node, visited, parent):
    visited.add(node)
    for neighbor in graph[node]:
      if neighbor not in visited:
        if is_cyclic(graph, neighbor, visited, node):
          return True
      elif parent != neighbor:
        return True
    return False

def has_cycle(graph):
   visited = set()
   for node in graph:
     if node not in visited:
      if is_cyclic(graph, node, visited, None):
          return True
   return False

graph = {
    'A' : ['B','C'],
    'B' : ['A','D'],
    'C' : ['A','D'],
    'D' : ['B','C']
}
print(has_cycle(graph))