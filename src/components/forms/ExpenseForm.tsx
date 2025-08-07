import { useState } from 'react';
import { Calendar, DollarSign, Tag, User, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const categories = [
  'Alimentação',
  'Transporte', 
  'Casa',
  'Lazer',
  'Saúde',
  'Educação',
  'Outros'
];

const responsibleUsers = [
  'João Silva',
  'Maria Silva', 
  'Ana Silva'
];

const expenseTypes = [
  { value: 'fixed', label: 'Fixo', description: 'Valor sempre igual' },
  { value: 'recurring', label: 'Recorrente', description: 'Repete mensalmente' },
  { value: 'variable', label: 'Variável', description: 'Valor eventual' }
];

export const ExpenseForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    responsible: '',
    type: '',
    description: '',
    recurring: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Despesa registrada com sucesso!', {
        description: `${formData.name} no valor de R$ ${formData.amount} foi registrada.`
      });
      
      // Reset form
      setFormData({
        name: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        responsible: '',
        type: '',
        description: '',
        recurring: false
      });
      
      setIsOpen(false);
    } catch (error) {
      toast.error('Erro ao registrar despesa', {
        description: 'Tente novamente em alguns instantes.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary text-white shadow-primary hover-lift">
          <DollarSign className="mr-2 h-4 w-4" />
          Nova Despesa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Adicionar Nova Despesa
          </DialogTitle>
          <DialogDescription>
            Registre uma nova despesa doméstica com todos os detalhes necessários.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Despesa</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Supermercado Extra"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Valor (R$)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={formData.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (Opcional)</Label>
                <Textarea
                  id="description"
                  placeholder="Detalhes adicionais sobre a despesa..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Classification */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Classificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          <div className="flex items-center">
                            <Tag className="mr-2 h-4 w-4" />
                            {category}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Data</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Responsável</Label>
                  <Select value={formData.responsible} onValueChange={(value) => handleInputChange('responsible', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Quem pagou?" />
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
              </div>

              {/* Expense Type */}
              <div className="space-y-3">
                <Label>Tipo de Despesa</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {expenseTypes.map(type => (
                    <div
                      key={type.value}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.type === type.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleInputChange('type', type.value)}
                    >
                      <div className="text-sm font-medium">{type.label}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-primary text-white shadow-primary flex-1 hover-lift"
            >
              {isLoading ? 'Salvando...' : 'Salvar Despesa'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </div>

          {/* Info Alert */}
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Dica:</p>
              <p className="text-muted-foreground">
                Despesas recorrentes são úteis para contas mensais como internet, luz, etc. 
                Elas aparecerão automaticamente todo mês.
              </p>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};