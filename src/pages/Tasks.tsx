import { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Copy, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { TaskForm } from '@/components/forms/TaskForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Mock data
const tasks = [
  {
    id: 1,
    title: 'Limpeza da geladeira',
    description: 'Limpar e organizar a geladeira, verificar validade dos alimentos',
    dueDate: '2024-08-03',
    assignee: 'Maria Silva',
    status: 'pending',
    priority: 'high',
    category: 'Limpeza',
    recurring: true
  },
  {
    id: 2,
    title: 'Pagar conta de luz',
    description: 'Efetuar pagamento da conta de energia elétrica',
    dueDate: '2024-08-04',
    assignee: 'João Silva',
    status: 'pending',
    priority: 'medium',
    category: 'Financeiro',
    recurring: false
  },
  {
    id: 3,
    title: 'Compras do supermercado',
    description: 'Lista: arroz, feijão, carne, verduras, produtos de limpeza',
    dueDate: '2024-08-05',
    assignee: 'Ana Silva',
    status: 'completed',
    priority: 'low',
    category: 'Compras',
    recurring: false
  },
  {
    id: 4,
    title: 'Aspirar a casa',
    description: 'Aspirar todos os cômodos da casa',
    dueDate: '2024-08-02',
    assignee: 'Maria Silva',
    status: 'in_progress',
    priority: 'medium',
    category: 'Limpeza',
    recurring: true
  },
  {
    id: 5,
    title: 'Revisar orçamento mensal',
    description: 'Analisar gastos do mês e ajustar orçamento',
    dueDate: '2024-08-06',
    assignee: 'João Silva',
    status: 'pending',
    priority: 'medium',
    category: 'Planejamento',
    recurring: false
  }
];

const categories = ['Todas', 'Limpeza', 'Financeiro', 'Compras', 'Planejamento', 'Manutenção'];
const statusOptions = ['Todos', 'pending', 'in_progress', 'completed'];
const priorityOptions = ['Todas', 'high', 'medium', 'low'];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-success text-white"><CheckCircle className="w-3 h-3 mr-1" />Concluída</Badge>;
    case 'in_progress':
      return <Badge className="bg-secondary text-white"><Clock className="w-3 h-3 mr-1" />Em Andamento</Badge>;
    case 'pending':
      return <Badge className="bg-warning text-white"><AlertTriangle className="w-3 h-3 mr-1" />Pendente</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge className="bg-danger text-white">Alta</Badge>;
    case 'medium':
      return <Badge className="bg-warning text-white">Média</Badge>;
    case 'low':
      return <Badge className="bg-success text-white">Baixa</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
};


export const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedPriority, setSelectedPriority] = useState('Todas');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || task.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Todos' || task.status === selectedStatus;
    const matchesPriority = selectedPriority === 'Todas' || task.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(t => t.status === 'completed').length;
  const pendingTasks = filteredTasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Tarefas</h1>
          <p className="text-muted-foreground">Organize as atividades domésticas</p>
        </div>
        <div className="flex gap-2">
          <TaskForm />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-custom-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">tarefas</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-custom-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Concluídas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">finalizadas</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-custom-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">ativas</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-custom-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground">aguardando</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="list">Lista de Tarefas</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          {/* Filters */}
          <Card className="shadow-custom-md">
            <CardHeader>
              <CardTitle>Filtros e Busca</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar tarefas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === 'Todos' ? 'Todos' : 
                         status === 'completed' ? 'Concluída' : 
                         status === 'in_progress' ? 'Em Andamento' : 'Pendente'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map(priority => (
                      <SelectItem key={priority} value={priority}>
                        {priority === 'Todas' ? 'Todas' : 
                         priority === 'high' ? 'Alta' : 
                         priority === 'medium' ? 'Média' : 'Baixa'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Table */}
          <Card className="shadow-custom-lg">
            <CardHeader>
              <CardTitle>Lista de Tarefas</CardTitle>
              <CardDescription>
                {filteredTasks.length} de {tasks.length} tarefas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tarefa</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-muted-foreground">{task.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{task.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {task.assignee.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{task.assignee}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Filter className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Marcar Concluída
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-danger">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};