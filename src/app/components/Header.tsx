import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, Briefcase, Heart, Gift, Shirt, Coffee, FolderOpen, Award, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { categories } from '../data/products';
import { useQuote } from '../context/QuoteContext';
import Logo from '../../assets/bgLogo.png';
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { quoteCount } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase size={20} />;
      case 'Heart': return <Heart size={20} />;
      case 'Gift': return <Gift size={20} />;
      case 'Shirt': return <Shirt size={20} />;
      case 'Coffee': return <Coffee size={20} />;
      case 'FolderOpen': return <FolderOpen size={20} />;
      case 'Award': return <Award size={20} />;
      case 'Leaf': return <Leaf size={20} />;
      default: return <Gift size={20} />;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-md' : 'bg-black'
        }`}
    >
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <img src={Logo} alt="Nishyash Corporation" className="h-25 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-3xl sm:text-5xl text-center font-bold text-accent font-script">Nishyash Gift Studio</span>
              {/* <span className="text-2xl text-accent font-script"></span> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link to="/home" className={`${navigationMenuTriggerStyle()} !bg-transparent !text-accent hover:!text-white !text-lg`}>
              Home
            </Link>

            <Link to="/about" className={`${navigationMenuTriggerStyle()} !bg-transparent !text-accent hover:!text-white !text-lg`}>
              About
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="!bg-transparent !text-accent hover:!text-white focus:!text-white data-[active]:!text-white data-[state=open]:!text-white !text-lg">Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/categories/${category.id}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2 text-sm font-medium leading-none mb-2">
                                {getCategoryIcon(category.icon)}
                                {category.name}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {category.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/contact" className={`${navigationMenuTriggerStyle()} !bg-transparent !text-accent hover:!text-primary !text-lg`}>
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <button className="text-accent hover:text-primary transition-colors">
              <Search size={22} />
            </button>

            <Link to="/quote" className="text-accent hover:text-white transition-colors relative">
              <ShoppingBag size={22} />
              {quoteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {quoteCount}
                </span>
              )}
            </Link>

            <Link to="/quote">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-accent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="flex flex-col space-y-4 pb-20">
              <Link
                to="/home"
                className="text-accent hover:text-white transition-colors py-2 font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-accent hover:text-white transition-colors py-2 font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>

              <div className="py-2">
                <span className="text-accent font-semibold block mb-2 text-lg">Products</span>
                <div className="pl-4 border-l-2 border-muted space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/categories/${category.id}`}
                      className="block text-accent hover:text-white transition-colors text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="text-accent hover:text-white transition-colors py-2 font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-4 border-t border-muted">
                <Link to="/quote" className="flex items-center space-x-2 text-accent py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingBag size={20} />
                  <span>Quote Cart ({quoteCount})</span>
                </Link>
              </div>

              <Link to="/quote" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Get a Quote
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
