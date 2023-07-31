import { Dispatch, SetStateAction, useState } from "react"
import { IPartialUser } from "../../../../../types/users"
import SearchInput from "../../../../../shared/Input/SearchInput"
import { searchUsersByQuery } from "../../../../../api/users"
import UsersSearchList from "./UsersSearchList"
import { useTranslation } from "react-i18next"

const UsersSearch = ({ searchUsersInputData, setSearchUsersInputData }: { searchUsersInputData: string | null, setSearchUsersInputData: Dispatch<SetStateAction<string | null>> }) => {
    const [searchUsersData, setSearchUsersData] = useState<IPartialUser[] | null>(null)
    const [searchUsersLoading, setSearchUsersLoading] = useState(false)
    const handleSearchUserData = async (text: string) => {
        if (text.length > 0) {
            setSearchUsersInputData(text)
            setSearchUsersLoading(true)
            const usersData = await searchUsersByQuery(text)
            setSearchUsersLoading(false)
            setSearchUsersData(usersData)
            return;
        }
        setSearchUsersData(null)
        setSearchUsersInputData(null)
    }
    const { t } = useTranslation()
    return (
        <>
            <SearchInput placeholder={t("searchUsers")} onChangeText={handleSearchUserData} />
            <UsersSearchList searchUsersData={searchUsersData} searchUsersLoading={searchUsersLoading} />
        </>
    )
}

export default UsersSearch