import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home, TrendingUp, CheckSquare, Users, Shield, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: TrendingUp,
    title: 'Controle Financeiro',
    description: 'Monitore gastos, defina orçamentos e acompanhe suas metas financeiras domésticas.'
  },
  {
    icon: CheckSquare,
    title: 'Gestão de Tarefas',
    description: 'Organize atividades domésticas, defina responsáveis e prazos para cada tarefa.'
  },
  {
    icon: Users,
    title: 'Compartilhamento Familiar',
    description: 'Colabore com todos os membros da família em tempo real.'
  },
  {
    icon: Shield,
    title: 'Dados Seguros',
    description: 'Seus dados financeiros e pessoais protegidos com criptografia avançada.'
  },
  {
    icon: Smartphone,
    title: 'Acesso Móvel',
    description: 'Use em qualquer dispositivo - computador, tablet ou smartphone.'
  }
];

const stats = [
  { label: 'Famílias Ativas', value: '2.5K+' },
  { label: 'Tarefas Completadas', value: '15K+' },
  { label: 'Economia Média', value: 'R$ 500/mês' },
  { label: 'Satisfação', value: '98%' }
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12 animate-fade-in">
        <div className="space-y-4">
          <Badge className="bg-gradient-primary text-white px-4 py-2 animate-scale-in">
            ✨ Organize sua casa com inteligência
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
            Gestão Doméstica
            <br />
            Simplificada
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            A plataforma completa para organizar despesas, tarefas e a vida doméstica 
            de forma colaborativa e inteligente.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Button 
            size="lg" 
            className="bg-gradient-primary text-white shadow-primary hover-lift"
            onClick={() => navigate('/dashboard')}
          >
            <Home className="mr-2 h-5 w-5" />
            Começar Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="hover-lift" onClick={() => navigate('/login')}>
            Fazer Login
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center bg-gradient-card shadow-custom-md">
            <CardContent className="pt-6">
              <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Tudo que você precisa para organizar sua casa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma solução completa que combina controle financeiro e gestão de tarefas 
            em uma interface moderna e intuitiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="shadow-custom-lg hover:shadow-custom-xl hover-lift transition-all duration-normal animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 hover-glow">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 py-12 bg-gradient-hero rounded-2xl text-white">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Pronto para transformar sua gestão doméstica?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Junte-se a milhares de famílias que já organizaram suas finanças e tarefas 
            com nossa plataforma.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => navigate('/dashboard')}
          >
            <Home className="mr-2 h-5 w-5" />
            Experimente Grátis
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/10"
            onClick={() => navigate('/login')}
          >
            Já tenho uma conta
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
