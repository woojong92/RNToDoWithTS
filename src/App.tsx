import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  TextInput,
  FlatList,
  Button,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
import {onChange} from 'react-native-reanimated';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import CheackBox from './components/CheckBox';
import {
  TabBox,
  TabsContainer,
  TabTitle,
  TodoBox,
  TodoListBox,
  TodoListInput,
  TodoListInputBox,
  TodoListSafeAreaView,
  TodoListTitle,
  TodoListTitleBox,
  TodoListTitleText,
  TodoListTitleView,
} from './styles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface ITodo {
  isCompleted: boolean;
  content: string;
  id: number;
}

const {width} = Dimensions.get('window');

type TabType = {
  title: string;
  type: string;
  currnetSelectedType: string;
  onPress: () => void;
};
const Tab = ({title, currnetSelectedType, type, onPress}: TabType) => (
  <Pressable onPress={onPress}>
    <TabBox isSelected={currnetSelectedType === type}>
      <TabTitle isSelected={currnetSelectedType === type}>{title}</TabTitle>
    </TabBox>
  </Pressable>
);

type SwipeListButtonType = {
  bg: string;
  title: string;
  onPress: () => void;
};

const SwipeListButton = ({bg, title, onPress}: SwipeListButtonType) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        backgroundColor: bg,
        width: 70,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white', fontSize: 18}}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const SwipeListViewContainer = (
  data: ITodo[],
  renderItem: any,
  updateTodo: () => void,
  deleteTodo: () => void,
) => (
  <SwipeListView
    keyExtractor={item => item.id.toString()}
    data={data}
    renderItem={renderItem}
    renderHiddenItem={(data, rowMap) => (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: 50,
        }}>
        <SwipeListButton
          bg="gray"
          title={'수정'}
          onPress={updateTodo} //
        />
        <SwipeListButton
          bg="red"
          title={'삭제'}
          onPress={deleteTodo} //() => deleteTodoById(data.item.id)
        />
      </View>
    )}
    rightOpenValue={-140}
  />
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [todos, setTodos] = useState<ITodo[] | []>([]);
  const [showTodos, setShowTodos] = useState<ITodo[] | []>([]);
  // const [activeTodos, setActiveTodos] = useState<ITodo[] | []>([]);
  // const [completedTodos, setCompletedTodos] = useState<ITodo[] | []>([]);

  const [textinput, setTextinput] = useState<string>('');

  const appendTodos = (
    event: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    if (!textinput.trim()) {
      return;
    }
    const newTodo = {
      isCompleted: false,
      content: textinput.trim(),
      id: event.timeStamp,
    };
    setTextinput('');
    setTodos([...todos, newTodo]);
    if (currnetSelectedType !== 'completed') {
      setShowTodos([...todos, newTodo]);
    }
  };

  const onChangeText = (text: string) => {
    setTextinput(text);
  };

  const toggleIsCompletedById = (todoId: number) => {
    const newTodos = todos.map(todo =>
      todo.id === todoId ? {...todo, isCompleted: !todo.isCompleted} : todo,
    );
    // const newShowTodos = showTodos.map(todo =>
    //   todo.id === todoId ? {...todo, isCompleted: !todo.isCompleted} : todo,
    // );
    // const newShowTodos = showTodos.reduce((acc, cur) => {
    //   let newTodo;
    //   if( cur.id === todoId ) newTodo = {...cur, isCompleted: !cur.isCompleted}
    //   else newTodo = cur;
    const newShowTodos = showTodos.filter(todo => todo.id !== todoId);

    console.log('newShowTodos', newShowTodos);
    setTodos(newTodos);
    setShowTodos(newShowTodos);
  };

  const deleteTodoById = (todoId: number) => {
    // console.log(rowMap);
    // closeRow(rowMap, todoId);
    const newTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(newTodos);
    setShowTodos(showTodos.filter(todo => todo.id !== todoId));
  };

  const closeRow = (rowMap: RowMap<ITodo>, rowKey: string) => {
    console.log(rowMap, rowKey);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = ({item}: ListRenderItemInfo<ITodo>) => (
    <Pressable onPress={() => toggleIsCompletedById(item.id)}>
      <TodoBox>
        {/* <BouncyCheckbox
        fillColor={item.isCompleted ? 'green' : 'gray'}
        // unfillColor="#fff"
        isChecked={item.isCompleted}
        textStyle={{color: item.isCompleted ? 'gray' : 'black'}}
        onPress={() => {
          toggleIsCompletedById(item.id);
        }}
        text={item.content}
      /> */}
        <Text>{item.content}</Text>
      </TodoBox>
    </Pressable>
  );

  const [currnetSelectedType, setCurrentSelectedType] = useState('all');

  // useEffect(() => {
  //   console.log(todos);
  // }, [todos, currnetSelectedType]);

  const onChangeCurrentSelectedType = (newType: string) => {
    console.log(newType);
    if (currnetSelectedType === newType) {
      return;
    }
    switch (newType) {
      case 'all':
        setShowTodos(todos);
        setCurrentSelectedType(newType);
        break;
      case 'active':
        const activeTodos = todos.filter(todo => todo.isCompleted === false);
        setShowTodos(activeTodos);
        setCurrentSelectedType('active');
        break;
      case 'completed':
        const completedTodos = todos.filter(todo => todo.isCompleted === true);
        setShowTodos(completedTodos);
        setCurrentSelectedType('completed');
        break;
      default:
        break;
    }
  };

  return (
    <TodoListSafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <TodoListTitleBox>
        <TodoListTitleText>TO DO LIST</TodoListTitleText>
      </TodoListTitleBox>

      <TodoListInputBox>
        <TodoListInput
          value={textinput}
          onChangeText={onChangeText}
          onEndEditing={appendTodos}
          placeholder={'할 일을 입력해 주세요.'}
        />
      </TodoListInputBox>

      <TabsContainer>
        <Tab
          title={'전 체'}
          currnetSelectedType={currnetSelectedType}
          type={'all'}
          onPress={() => onChangeCurrentSelectedType('all')}
        />
        <Tab
          title={'해야 할 일'}
          currnetSelectedType={currnetSelectedType}
          type={'active'}
          onPress={() => onChangeCurrentSelectedType('active')}
        />
        <Tab
          title={'완료된 일'}
          currnetSelectedType={currnetSelectedType}
          type={'completed'}
          onPress={() => onChangeCurrentSelectedType('completed')}
        />
      </TabsContainer>

      <SwipeListView
        keyExtractor={item => item.id.toString()}
        data={showTodos}
        renderItem={renderItem}
        renderHiddenItem={(data, rowMap) => (
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              height: 50,
            }}>
            <SwipeListButton
              bg="gray"
              title={'수정'}
              onPress={() => closeRow(rowMap, data.item.id)}
            />
            <SwipeListButton
              bg="red"
              title={'삭제'}
              onPress={() => deleteTodoById(data.item.id)}
            />
          </View>
        )}
        rightOpenValue={-140}
      />
    </TodoListSafeAreaView>
  );
};

export default App;
