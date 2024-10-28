import React from 'react'
import VerifiedSVG from '../../../../components/SVGs/VerifiedSVG'
import LockSVG from '../../../../components/SVGs/LockSVG'

import DefaultPfp from '../../../../assets/Generic-Profile.jpg'


interface DiscoverySearchDropDownResultProps {
    pfp: string;
    nickname: string;
    verifiedAccount: boolean;
    privateAccount: boolean;
    organization: string;
    username: string;
}

export const DiscoverySearchDropDownResult: React.FC<DiscoverySearchDropDownResultProps> = ({
    pfp, nickname, verifiedAccount, privateAccount, organization, username
}) => {
    return (
        <div className='discovery-search-drop-down-result'>
            <img className='discovery-search-drop-down-result-pfp' src={pfp ? pfp : DefaultPfp} alt={`${username}'s pfp`} />
            <div className='discovery-search-drop-down-result-name-section'>
                <div className='discovery-search-drop-down-result-nickname-section'>
                    <p className='discovery-search-drop-down-result-nickname'>{nickname}</p>
                    {verifiedAccount && <VerifiedSVG color={'#1DA1F2'} height={12} width={12} />}
                    {privateAccount && <LockSVG color={'#FFF'} height={12} width={12} />}
                    {organization && <img className='discovery-search-drop-down-organization' src={organization} alt={`${username}'s organization`} />}
                </div>
                <p className='discovery-search-drop-down-usernam'>
                    @{username}
                </p>
            </div>
        </div>
    )
}

