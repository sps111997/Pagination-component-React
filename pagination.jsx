import React, { useEffect, useState } from "react";
import Button from "common/components/Button";
import CustomDropdown from "common/components/CustomDropdown";
import leftArrow from "common/assets/messagebuz/svgs/paginationLeft.svg";
import rightArrow from "common/assets/messagebuz/svgs/paginationRight.svg";
import styled from "styled-components";
import { getPaginatorArray } from "../../utils";

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: var(--center);
    padding: 8px;
    border: ${(props) => (props.showBorder ? "1px solid var(--outline)" : "unset")};
`;

const ButtonWrapper = styled(Button)`
    background-color: ${(props) => (props.isActive ? "var(--primary)" : "transparent")};
    border-radius: var(--br-50);
    color: ${(props) => (props.isActive ? "var(--white)" : "var(--grey)")};
    height: 24px;
    width: 24px;
    line-height: var(--lh-19);
    font-size: var(--fs-12);
    font-weight: var(--fw-700);
    padding: 0;
`;

const PageInfo = styled.p`
    color: var(--grey);
    margin: 0px;
`;

const Label = styled(PageInfo)`
    margin: auto;
`;

const PageCount = styled.div`
    display: flex;
    align-items: var(--center);
    column-gap: 16px;
`;

const Pagination = (props) => {
    const {
        onPageChange,
        currentPage = 1,
        size, // Total number of rows in table
        nextText,
        previousText,
        pageSizes = [10, 50, 100],
        showInfo = true,
        showBorder = false,
    } = props;

    const [visiblePages, setVisiblePages] = useState();
    const [pageSize, setPageSize] = useState(10);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        const visiblePages = getPaginatorArray(1, totalPages);
        setVisiblePages(filterPages(visiblePages, totalPages));
        setActivePage(currentPage);
    }, [pageSize]);

    // To find how many number of pages according to pageSize
    const totalPages = Math.ceil(size / pageSize);

    // Filter pages which one to show in pagination
    const filterPages = (visiblePages, totalPages) => {
        return visiblePages.filter((page) => page <= totalPages);
    };

    const changePage = (page) => () => {
        setActivePage(page);
        const visiblePages = getPaginatorArray(page, totalPages);
        setVisiblePages(filterPages(visiblePages, totalPages));
        onPageChange(page);
    };

    return (
        <PaginationWrapper showBorder={showBorder}>
            {showInfo && (
                <PageInfo>{`Showing ${(activePage - 1) * pageSize + 1} - ${
                    size >= activePage * pageSize ? activePage * pageSize : size
                } of 
                 of ${size} results`}</PageInfo>
            )}
            <PageCount>
                <Label>Items per page</Label>
                <CustomDropdown
                    wrapperWidth="72px"
                    showArrow={false}
                    wrapperHeight="28px"
                    value={{ label: pageSize, value: pageSize }}
                    onChange={(e) => {
                        setPageSize(e.value);
                        setActivePage(1);
                    }}
                    options={pageSizes.map((pageSize) => ({
                        label: pageSize,
                        value: pageSize,
                    }))}
                />
                <div style={{ display: "flex" }}>
                    <ButtonWrapper
                        onClick={changePage(activePage - 1)}
                        disabled={activePage === 1}
                        isActive={false}
                    >
                        {previousText ? (
                            { previousText }
                        ) : (
                            <img src={leftArrow} alt="prev-page-arrow" />
                        )}
                    </ButtonWrapper>
                    <div style={{ display: "flex" }}>
                        {visiblePages &&
                            visiblePages.map((page) => (
                                <ButtonWrapper
                                    key={page}
                                    onClick={changePage(page)}
                                    isActive={page === activePage}
                                    disabled={page < 0}
                                >
                                    {page < 0 ? ` ...` : page}
                                </ButtonWrapper>
                            ))}
                    </div>
                    <ButtonWrapper
                        disabled={activePage === totalPages}
                        onClick={changePage(activePage + 1)}
                        isActive={false}
                    >
                        {nextText ? { nextText } : <img src={rightArrow} alt="next-page-arrow" />}
                    </ButtonWrapper>
                </div>
            </PageCount>
        </PaginationWrapper>
    );
};

export default Pagination;

