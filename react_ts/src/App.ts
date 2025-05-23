import React, { useState, useEffect, useCallback, useRef } from 'react';

const VirtualScrollList = ({ 
    items, 
    itemHeight = 100, 
    containerHeight = 600,
    bufferSize = 5,
    renderItem 
}) => {
    const [scrollTop, setScrollTop] = useState(0);
    const scrollElementRef = useRef();
    
    // 计算可视区域信息
    const getVisibleRange = useCallback(() => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const visibleCount = Math.ceil(containerHeight / itemHeight);
        
        return {
            startIndex: Math.max(0, startIndex - bufferSize),
            endIndex: Math.min(
                items.length - 1, 
                startIndex + visibleCount + bufferSize
            ),
            offsetY: Math.max(0, startIndex - bufferSize) * itemHeight
        };
    }, [scrollTop, itemHeight, containerHeight, bufferSize, items.length]);
    
    const { startIndex, endIndex, offsetY } = getVisibleRange();
    
    // 获取可视项目
    const visibleItems = items.slice(startIndex, endIndex + 1);
    
    // 滚动事件处理
    const handleScroll = useCallback((e) => {
        const newScrollTop = e.target.scrollTop;
        setScrollTop(newScrollTop);
    }, []);
    
    // 总高度
    const totalHeight = items.length * itemHeight;
    
    return (
        <div
            ref={scrollElementRef}
            className="virtual-scroll-container"
            style={{
                height: containerHeight,
                overflow: 'auto',
                position: 'relative'
            }}
            onScroll={handleScroll}
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                <div 
                    style={{
                        transform: `translateY(${offsetY}px)`,
                        position: 'relative'
                    }}
                >
                    {visibleItems.map((item, index) => (
                        <div
                            key={item.id || startIndex + index}
                            style={{ height: itemHeight }}
                            className="virtual-scroll-item"
                        >
                            {renderItem ? renderItem(item, startIndex + index) : (
                                <div>{item.content || `Item ${startIndex + index}`}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 使用示例
const App = () => {
    // 生成大量测试数据
    const items = Array.from({ length: 10000 }, (_, index) => ({
        id: index,
        content: `这是第 ${index + 1} 个项目`,
        data: `一些数据 ${index}`
    }));
    
    const renderItem = (item, index) => (
        <div style={{ 
            padding: '20px', 
            border: '1px solid #ccc', 
            margin: '5px 0' 
        }}>
            <h4>{item.content}</h4>
            <p>{item.data}</p>
        </div>
    );
    
    return (
        <div>
            <h1>虚拟滚动示例 - 10000个项目</h1>
            <VirtualScrollList
                items={items}
                itemHeight={100}
                containerHeight={600}
                renderItem={renderItem}
            />
        </div>
    );
};