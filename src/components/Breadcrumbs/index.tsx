import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

import { Link } from "@tanstack/react-router"
import React from "react";

interface BreadcrumbItem {
    to: string,
    name: string
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {items?.map((item, i) => (
                    <React.Fragment key={i}>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={item.to}>{item.name}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {i < (items?.length - 1) && <BreadcrumbSeparator />}
                        
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;