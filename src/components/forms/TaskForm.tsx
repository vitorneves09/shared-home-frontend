import { useState } from 'react';
import { Calendar, CheckSquare, User, AlertTriangle, Clock, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const categories = [
  'Limpeza',
  'Financeiro',
  'Compras',
  'Planejamento',
  'Manutenção',
  'Outros'
];

const responsibleUsers = [
  'João Silva',
  'Maria Silva',
  'Ana Silva'
];

const priorities = [
  { value: 'low', label: 'Baixa', color: 'bg-success', icon: '🟢' },
  { value: 'medium', label: 'Média', color: 'bg-warning', icon: '🟡' },
  { value: 'high', label: 'Alta', color: 'bg-danger', icon: '🔴' }
];

export const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignee: '',
    priority: 'medium',
    category: '',
    recurring: false,
    recurringFrequency: 'weekly'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Task data:', formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CheckSquare className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-primary" />
            Criar Nova Tarefa
          </DialogTitle>
          <DialogDescription>
            Adicione uma nova tarefa doméstica e defina responsáveis e prazos.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações da Tarefa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Tarefa</Label>
                <Input
                  id="title"
                  placeholder="Ex: Limpeza da geladeira"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva os detalhes da tarefa..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Assignment and Timing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Atribuição e Prazo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Responsável</Label>
                  <Select value={formData.assignee} onValueChange={(value) => handleInputChange('assignee', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Quem vai fazer?" />
                    </SelectTrigger>
                    <SelectContent>
                      {responsibleUsers.map(user => (
                        <SelectItem key={user} value={user}>
                          <div className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            {user}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Data de Vencimento</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de tarefa" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Prioridade</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {priorities.map(priority => (
                      <div
                        key={priority.value}
                        className={`p-2 rounded-lg border-2 cursor-pointer transition-all text-center ${
                          formData.priority === priority.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleInputChange('priority', priority.value)}
                      >
                        <div className="text-lg mb-1">{priority.icon}</div>
                        <div className="text-xs font-medium">{priority.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recurring Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Repeat className="h-5 w-5" />
                Tarefa Recorrente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Repetir esta tarefa</Label>
                  <p className="text-sm text-muted-foreground">
                    A tarefa será criada automaticamente no próximo período
                  </p>
                </div>
                <Switch
                  checked={formData.recurring}
                  onCheckedChange={(checked) => handleInputChange('recurring', checked)}
                />
              </div>

              {formData.recurring && (
                <div className="space-y-2">
                  <Label>Frequência</Label>
                  <Select value={formData.recurringFrequency} onValueChange={(value) => handleInputChange('recurringFrequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          Diariamente
                        </div>
                      </SelectItem>
                      <SelectItem value="weekly">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          Semanalmente
                        </div>
                      </SelectItem>
                      <SelectItem value="monthly">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          Mensalmente
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="submit" className="bg-gradient-primary text-white shadow-primary flex-1">
              Criar Tarefa
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Cancelar
            </Button>
          </div>

          {/* Priority Legend */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <span className="font-medium">Dica:</span> Use prioridades para organizar melhor suas tarefas. 
              Tarefas de alta prioridade aparecem em destaque no dashboard.
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};