import pandas as pd
import re

def snake_to_camel(query_result):
    result = []
    for i in range(len(query_result)):
        data = query_result[i]
        keys = list(data.keys())
        for snake_style in keys:
            camel_style = re.sub('_[a-zA-Z]', lambda m : m.group().upper().replace('_', ""), snake_style)
            data[camel_style] = data.pop(snake_style)    
        result.append(data)
    return result

# SQLAlchemy query proxy to dictionary
def query_to_dict(ret):
    if ret is not None:
        query = [{key: value for key, value in row.items()} for row in ret if row is not None]
        if len(query):
            return snake_to_camel(query)
        return [{}]
    else:
        return [{}]

# N * M * K rows SQL query to N rows list 
def many_to_one(data):
    df = pd.DataFrame(data)
    orders = map(int, df['orderPk'].unique())
    order_list = []
    for order in orders:
        order_df = df[df['orderPk'] == order]
        order_dict = {'orderPk' : order, 'orderTime' : order_df.iloc[0]['orderTime'], 'menus' : [], 'completed' : bool(order_df.iloc[0]['completed'])}
        products = map(int, order_df['productPk'].unique())
        for product in products:
            product_df = order_df[order_df['productPk'] == product]
            product_dict = {'productPk' : product, 'menuName' : product_df.iloc[0]['menuName'], 'quantity' : int(product_df.iloc[0]['quantity']),
                            'options' : product_df['optionName'].values.tolist()}
            order_dict['menus'].append(product_dict)
        order_list.append(order_dict)

    return order_list