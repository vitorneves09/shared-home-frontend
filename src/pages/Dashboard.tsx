import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, Plus, Receipt, CheckSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ExpenseForm } from '@/components/forms/ExpenseForm';
import { TaskForm } from '@/components/forms/TaskForm';

// Mock data
const financialSummary = {
  totalSpent: 2450.00,
  monthlyBudget: 3500.00,
  percentageUsed: 70,
  trend: 5.2
};

const expensesByCategory = [
  { category: 'Alimentação', amount: 850, color: 'bg-primary', percentage: 35 },
  { category: 'Transporte', amount: 420, color: 'bg-secondary', percentage: 17 },
  { category: 'Casa', amount: 680, color: 'bg-accent', percentage: 28 },
  { category: 'Lazer', amount: 300, color: 'bg-success', percentage: 12 },
  { category: 'Outros', amount: 200, color: 'bg-warning', percentage: 8 }
];

const upcomingTasks = [
  {
    id: 1,
    title: 'Limpeza da geladeira',
    dueDate: '2024-08-03',
    assignee: 'Maria Silva',
    priority: 'high',
    category: 'Limpeza'
  },
  {
    id: 2,
    title: 'Pagar conta de luz',
    dueDate: '2024-08-04',
    assignee: 'João Silva',
    priority: 'medium',
    category: 'Financeiro'
  },
  {
    id: 3,
    title: 'Compras do supermercado',
    dueDate: '2024-08-05',
    assignee: 'Ana Silva',
    priority: 'low',
    category: 'Compras'
  },
  {
    id: 4,
    title: 'Revisar orçamento mensal',
    dueDate: '2024-08-06',
    assignee: 'João Silva',
    priority: 'medium',
    category: 'Planejamento'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-danger text-white';
    case 'medium': return 'bg-warning text-white';
    case 'low': return 'bg-success text-white';
    default: return 'bg-muted';
  }
};

const getPriorityText = (priority: string) => {
  switch (priority) {
    case 'high': return 'Alta';
    case 'medium': return 'Média';
    case 'low': return 'Baixa';
    default: return 'Normal';
  }
};

export const Dashboard = () => {
  const remainingBudget = financialSummary.monthlyBudget - financialSummary.totalSpent;
  const isOverBudget = remainingBudget < 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Visão geral da sua gestão doméstica</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <ExpenseForm />
          <TaskForm />
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-gradient-card shadow-custom-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">R$ {financialSummary.totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
              +{financialSummary.trend}% desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-custom-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Restante</CardTitle>
            {isOverBudget ? (
              <AlertCircle className="h-4 w-4 text-danger" />
            ) : (
              <CheckCircle className="h-4 w-4 text-success" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-xl sm:text-2xl font-bold ${isOverBudget ? 'text-danger' : 'text-success'}`}>
              R$ {Math.abs(remainingBudget).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              {isOverBudget ? 'Acima do orçamento' : 'Dentro do orçamento'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-custom-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">% Orçamento Usado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{financialSummary.percentageUsed}%</div>
            <Progress value={financialSummary.percentageUsed} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-custom-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{upcomingTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingTasks.filter(task => task.priority === 'high').length} de alta prioridade
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Expenses by Category */}
        <Card className="shadow-custom-lg">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Gastos por Categoria</CardTitle>
            <CardDescription>Distribuição dos gastos do mês atual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {expensesByCategory.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.category}</span>
                  <span className="text-sm text-muted-foreground">
                    R$ {category.amount.toLocaleString('pt-BR')} ({category.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`${category.color} h-2 rounded-full transition-all duration-slow`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="shadow-custom-lg">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Próximas Tarefas</CardTitle>
            <CardDescription>Tarefas com vencimento próximo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border bg-gradient-card">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {task.assignee.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        <span className="hidden sm:inline">{task.assignee} • </span>
                        {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                      {task.category}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {getPriorityText(task.priority)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 text-sm">
              Ver Todas as Tarefas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};