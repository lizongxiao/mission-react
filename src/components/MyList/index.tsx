import "./index.css";
import RequestHandler from "../RequestHandler";
import MyModal from "../MyModal";
import MissionForm from "../MissionForm";
import { Button, Space, Table, Input, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  DataType,
  initMission,
  delMission,
  addMission,
} from "../../store/modules/missionStore";
import { getListData } from "../../apis";
import { debounce } from "lodash";
import React from "react";

const { Column } = Table;

interface ActionListProps {
  data: DataType[];
  handleMissionAction: (key: string, params?: any) => void;
  filterMission: (value: string) => void;
}

type handleACtionType = Pick<ActionListProps, "handleMissionAction">;
type handleSearchType = Pick<ActionListProps, "filterMission">;

// 打开新增任务
const OpenAddMissionForm = ({ handleMissionAction }: handleACtionType) => {
  const onSuccess = (data: any) => {
    handleMissionAction("addMission", { mission: data });
  };

  return (
    <MyModal onSuccess={onSuccess}>
      <MissionForm />
    </MyModal>
  );
};

// 搜索任务
const SearchMission = ({ filterMission }: handleSearchType) => {
  const onChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    filterMission(e.target.value);
  }, 500);

  return (
    <Input
      onChange={onChange}
      placeholder="请输入任务名"
      allowClear
      size="large"
      style={{ width: 500 }}
    />
  );
};

const ActionList = ({
  data,
  handleMissionAction,
  filterMission,
}: ActionListProps) => {
  // 删除任务
  const onDelMission = (_: any, record: DataType) => (
    <Space size="middle">
      <Button
        type="link"
        onClick={() => handleMissionAction("delMission", { key: record.key })}
      >
        删除
      </Button>
    </Space>
  );

  const emptyText = () => {
    return <Empty description="暂无数据" />;
  };

  return (
    <>
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <SearchMission filterMission={filterMission} />
        <OpenAddMissionForm handleMissionAction={handleMissionAction} />
      </Space>
      <Table
        locale={
          {
            emptyText: emptyText(),
          } as any
        }
        dataSource={data}
        pagination={false}
        scroll={{ y: 400 }}
      >
        <Column ellipsis title="任务名称" dataIndex="mission" key="mission" />
        <Column
          align="center"
          title="操作"
          key="action"
          render={onDelMission}
          width={200}
        />
      </Table>
    </>
  );
};

const MyList = () => {
  const dispatch = useDispatch();
  const { mission } = useSelector((state: any) => state.missioner);

  const [searchVal, setSearchVal] = React.useState<string>("");
  const [tempMission, setTempMission] = React.useState<DataType[]>([]);

  const onDataReceived = (data: DataType[]) => {
    handleMissionAction("initMission", { data });
  };

  const filterMission = (value: string) => {
    setSearchVal(value);
    const temp = mission.filter((item: DataType) => {
      return item.mission.includes(value);
    });
    setTempMission(temp);
  };

  const handleMissionAction = (key: string, params?: any) => {
    const missionMap: any = {
      initMission: initMission(params),
      delMission: delMission(params),
      addMission: addMission(params),
    };

    dispatch(missionMap[key]);
  };
  return (
    <RequestHandler
      interfaceFunction={getListData}
      onDataReceived={onDataReceived}
    >
      <ActionList
        data={searchVal?.length ? tempMission : mission}
        filterMission={filterMission}
        handleMissionAction={handleMissionAction}
      />
    </RequestHandler>
  );
};

export default MyList;
