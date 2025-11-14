import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Icon {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface CartItem extends Icon {
  quantity: number;
}

const icons: Icon[] = [
  {
    id: 1,
    name: 'Иисус Христос Пантократор',
    price: 15000,
    image: 'https://cdn.poehali.dev/projects/c227eaf2-e0b4-47ed-a542-9625702fe836/files/66207081-56c3-4fec-96b2-903d1d392c14.jpg',
    category: 'Спаситель',
    description: 'Византийский стиль, ручная работа'
  },
  {
    id: 2,
    name: 'Богородица с Младенцем',
    price: 18000,
    image: 'https://cdn.poehali.dev/projects/c227eaf2-e0b4-47ed-a542-9625702fe836/files/8c66d7a0-81d3-4ffb-8428-f6b675abeec7.jpg',
    category: 'Богородица',
    description: 'Традиционная иконопись'
  },
  {
    id: 3,
    name: 'Святой Николай Чудотворец',
    price: 12000,
    image: 'https://cdn.poehali.dev/projects/c227eaf2-e0b4-47ed-a542-9625702fe836/files/b54e1905-b413-4aa2-9933-3824808f3a47.jpg',
    category: 'Святые',
    description: 'Классическое письмо'
  },
  {
    id: 4,
    name: 'Троица Рублёва',
    price: 25000,
    image: 'https://cdn.poehali.dev/projects/c227eaf2-e0b4-47ed-a542-9625702fe836/files/66207081-56c3-4fec-96b2-903d1d392c14.jpg',
    category: 'Праздничные',
    description: 'Копия знаменитой иконы'
  },
  {
    id: 5,
    name: 'Архангел Михаил',
    price: 14000,
    image: 'https://cdn.poehali.dev/projects/c227eaf2-e0b4-47ed-a542-9625702fe836/files/8c66d7a0-81d3-4ffb-8428-f6b675abeec7.jpg',
    category: 'Ангелы',
    description: 'Защитник небесный'
  },
  {
    id: 6,
    name: 'Святая Матрона Московская',
    price: 11000,
    image: 'https://cdn.poehali.dev/projects/c227eaf2-e0b4-47ed-a542-9625702fe836/files/b54e1905-b413-4aa2-9933-3824808f3a47.jpg',
    category: 'Святые',
    description: 'Современная иконопись'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [activeSection, setActiveSection] = useState<string>('home');

  const categories = ['Все', 'Спаситель', 'Богородица', 'Святые', 'Праздничные', 'Ангелы'];

  const addToCart = (icon: Icon) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === icon.id);
      if (existing) {
        return prev.map(item =>
          item.id === icon.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...icon, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(prev => prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredIcons = selectedCategory === 'Все'
    ? icons
    : icons.filter(icon => icon.category === selectedCategory);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary font-cormorant">Святые Образы</h1>
            
            <nav className="hidden md:flex gap-8">
              <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">Главная</button>
              <button onClick={() => scrollToSection('catalog')} className="text-foreground hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">О нас</button>
              <button onClick={() => scrollToSection('contacts')} className="text-foreground hover:text-primary transition-colors">Контакты</button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="font-cormorant">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-cormorant font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={12} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={12} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-cormorant text-lg">Итого:</span>
                          <span className="font-bold text-xl">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">Оформить заказ</Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="home" className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-cormorant font-bold mb-6">
              Святые образы для вашего дома
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Традиционная иконопись ручной работы. Каждая икона создаётся с любовью и благоговением мастерами-иконописцами
            </p>
            <Button size="lg" onClick={() => scrollToSection('catalog')} className="group">
              Перейти в каталог
              <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-cormorant font-bold text-center mb-12">Каталог икон</h2>
          
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIcons.map(icon => (
              <Card key={icon.id} className="overflow-hidden group hover:shadow-lg transition-shadow animate-scale-in">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={icon.image}
                    alt={icon.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <Badge className="mb-3">{icon.category}</Badge>
                  <h3 className="text-xl font-cormorant font-semibold mb-2">{icon.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{icon.description}</p>
                  <p className="text-2xl font-bold text-primary">{icon.price.toLocaleString('ru-RU')} ₽</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => addToCart(icon)} className="w-full group">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-cormorant font-bold text-center mb-8">О нас</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                Мы — семейная мастерская иконописцев с многолетним опытом создания священных образов. 
                Наша миссия — сохранение и развитие традиций православной иконописи.
              </p>
              <p className="text-muted-foreground mb-6">
                Каждая икона пишется по канонам византийского искусства с использованием 
                натуральных материалов: яичной темперы, сусального золота и левкаса. 
                Процесс создания одной иконы может занимать от нескольких недель до нескольких месяцев.
              </p>
              <p className="text-muted-foreground">
                Мы верим, что икона — это не просто предмет искусства, но окно в духовный мир, 
                средство молитвенного общения с Богом и святыми.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-cormorant font-bold text-center mb-12">Контакты</h2>
          <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-cormorant font-semibold mb-4">Свяжитесь с нами</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Адрес</p>
                    <p className="text-muted-foreground">г. Москва, ул. Пречистенка, 12</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@svyatie-obrazy.ru</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-cormorant font-semibold mb-4">Напишите нам</h3>
              <form className="space-y-4">
                <Input placeholder="Ваше имя" />
                <Input type="email" placeholder="Email" />
                <Textarea placeholder="Сообщение" rows={4} />
                <Button type="submit" className="w-full">Отправить</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-cormorant text-lg mb-2">Святые Образы</p>
          <p className="text-sm opacity-80">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
