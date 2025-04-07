import { Bolt } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { BellDot } from "lucide-react";
import { BookOpenText } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import { Users } from "lucide-react";
import { Lock } from "lucide-react";
import { Dessert } from "lucide-react";
import { ShieldPlus } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Images } from "lucide-react";
import { Figma } from "lucide-react";
import { Play } from "lucide-react";
import { MapPin } from "lucide-react";
import { Database } from "lucide-react";
import { PanelsTopLeft } from "lucide-react";
import { PanelTop } from "lucide-react";
import { Code } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { LineChart } from "lucide-react";
import { Puzzle } from "lucide-react";
import { Wrench } from "lucide-react";
import { Terminal } from "lucide-react";
import { FileCode } from "lucide-react";
import { Gem } from "lucide-react";

export const Menus = [
  {
    name: "Products",
    subMenuHeading: ["Core", "Additional"],
    subMenu: [
      {
        name: "Platform",
        desc: "Main service",
        icon: PanelsTopLeft,
      },
      {
        name: "Analytics",
        desc: "Business intelligence",
        icon: BarChart3,
      },
      {
        name: "Security",
        desc: "Data protection",
        icon: Lock,
      },
      {
        name: "Integrations",
        desc: "Third-party services",
        icon: Puzzle,
      },
    ],
    gridCols: 2,
  },
  {
    name: "Solutions",
    subMenuHeading: ["Industries", "Business Size"],
    subMenu: [
      {
        name: "Finance",
        desc: "Banking & investments",
        icon: LineChart,
      },
      {
        name: "Retail",
        desc: "Stores & chains",
        icon: ShoppingBag,
      },
      {
        name: "Small Business",
        desc: "For startups",
        icon: BriefcaseBusiness,
      },
      {
        name: "Enterprise",
        desc: "For large companies",
        icon: ShieldPlus,
      },
    ],
    gridCols: 2,
  },
  {
    name: "Developers",
    subMenuHeading: ["Documentation", "Tools"],
    subMenu: [
      {
        name: "API",
        desc: "Service integration",
        icon: Code,
      },
      {
        name: "SDK",
        desc: "Development libraries",
        icon: Terminal,
      },
      {
        name: "Plugins",
        desc: "Extensions",
        icon: Wrench,
      },
      {
        name: "Code Examples",
        desc: "Ready solutions",
        icon: FileCode,
      },
    ],
    gridCols: 2,
  },
  {
    name: "Resources",
    subMenuHeading: ["Learning", "Support"],
    subMenu: [
      {
        name: "Blog",
        desc: "News & articles",
        icon: BookOpenText,
      },
      {
        name: "Learning",
        desc: "Video tutorials",
        icon: Play,
      },
      {
        name: "Help Center",
        desc: "Support resources",
        icon: CircleHelp,
      },
      {
        name: "Community",
        desc: "Forum & discussions",
        icon: MessageCircle,
      },
    ],
    gridCols: 2,
  },
  {
    name: "Pricing",
  },
];
