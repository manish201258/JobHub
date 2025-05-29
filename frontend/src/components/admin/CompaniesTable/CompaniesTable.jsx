import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage } from '../../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CompaniesTable.css';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if(!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    // Animation variants
    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.5
            }
        })
    };

    return (
        <motion.div 
            className="companies-table-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="companies-table-card"
                initial={{ rotateX: -5, rotateY: -2 }}
                animate={{ rotateX: 0, rotateY: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ 
                    boxShadow: "0 15px 30px rgba(0, 255, 0, 0.1)"
                }}
            >
                <table className="companies-table">
                    <caption className="companies-table-caption">
                        A list of your recent registered companies
                    </caption>
                    <thead className="companies-table-header">
                        <tr className="companies-table-header-row">
                            <th className="companies-table-header-cell">Logo</th>
                            <th className="companies-table-header-cell">Name</th>
                            <th className="companies-table-header-cell">Date</th>
                            <th className="companies-table-header-cell companies-table-action-cell">Action</th>
                        </tr>
                    </thead>
                    <tbody className="companies-table-body">
                        {filterCompany?.map((company, i) => (
                            <motion.tr
                                key={company._id}
                                className="companies-table-row"
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={rowVariants}
                                whileHover={{
                                    backgroundColor: 'rgba(0, 255, 0, 0.03)',
                                    borderLeft: '3px solid #00ff00'
                                }}
                            >
                                <td className="companies-table-cell companies-table-logo-cell">
                                    <motion.div 
                                        className="companies-table-avatar"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <Avatar>
                                            <AvatarImage src={company.logo} alt={company.name} />
                                        </Avatar>
                                    </motion.div>
                                </td>
                                <td className="companies-table-cell companies-table-name-cell">
                                    {company.name}
                                </td>
                                <td className="companies-table-cell companies-table-date-cell">
                                    {company.createdAt.split("T")[0]}
                                </td>
                                <td className="companies-table-cell companies-table-action-cell">
                                    <Popover>
                                        <PopoverTrigger>
                                            <motion.div
                                                className="companies-table-action-trigger"
                                                whileHover={{ scale: 1.2, color: '#00ff00' }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <MoreHorizontal />
                                            </motion.div>
                                        </PopoverTrigger>
                                        <PopoverContent className="companies-table-popover-content">
                                            <motion.div 
                                                className="companies-table-edit-option"
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                whileHover={{ 
                                                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                                                    paddingLeft: '10px'
                                                }}
                                            >
                                                <Edit2 className="companies-table-edit-icon" />
                                                <span>Edit</span>
                                            </motion.div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </motion.div>
    )
}

export default CompaniesTable;