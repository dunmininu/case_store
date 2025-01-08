import { LucideProps } from "lucide-react";

export const Icons = {
    underline2: (props: LucideProps) => (
        <svg
            {...props}
            viewBox="0 0 687 155"
        >
            <g
                stroke="currentColor"
                strokeWidth='7'
                fill="none"
                fill-rule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4 21H20M18 4V11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11V4M4 3H8M16 3H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
        </svg>
    ),
    underline: (props: LucideProps) => 
        <svg
            {...props}
            viewBox="0 0 687 155"
        >
            <g
                stroke="currentColor"
                strokeWidth='7'
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    d= 'M20 98c27-13.3333333 54-20 81-20 40.5 • 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20'
                    opacity='.3'
                    ></path>
                    <path d='M20 118c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20'></path>
            </g>
        </svg>
    ,
    
}